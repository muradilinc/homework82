import express from 'express';
import { Track } from '../types';
import Tracks from '../models/Tracks';
import mongoose, { Types } from 'mongoose';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: Track = {
      title: req.body.title,
      number: req.body.number,
      album: req.body.album,
      duration: req.body.duration,
    };

    const track = new Tracks(trackData);
    await track.save();
    res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error.message);
    }
    return next(error);
  }
});

tracksRouter.get('/', async (req, res, next) => {
  try {
    let results;
    let _id: Types.ObjectId;
    if (req.query.album) {
      try {
        _id = new Types.ObjectId(req.query.album as string);
      } catch {
        return res.status(404).send({ error: 'Wrong album' });
      }
      results = await Tracks.find({ album: _id });
    } else if (req.query.artist) {
      try {
        _id = new Types.ObjectId(req.query.artist as string);
      } catch {
        return res.status(404).send({ error: 'Wrong artist' });
      }
      results = await Tracks.find().populate({
        path: 'album',
        match: { author: _id },
      });
      const filterTracks = results.filter((track) => track.album !== null);
      return res.send(filterTracks);
    } else {
      results = await Tracks.find();
    }
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.post('/track_history', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).send({ error: 'No token present' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }

    const tracks = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date().toISOString(),
    });

    return res.send(tracks);
  } catch (error) {
    return next(error);
  }
});

export default tracksRouter;
