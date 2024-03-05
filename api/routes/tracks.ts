import express from 'express';
import { Track } from '../types';
import Tracks from '../models/Tracks';
import mongoose, { Types } from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.post('/', auth, permit('user'), async (req, res, next) => {
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

tracksRouter.post(
  '/tracks_history',
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      const tracks = new TrackHistory({
        user: req.user?._id,
        track: req.body.track,
        datetime: new Date().toISOString(),
      });

      await tracks.save();
      return res.send(tracks);
    } catch (error) {
      return next(error);
    }
  },
);

tracksRouter.get(
  '/tracks_history',
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      const results = await TrackHistory.find({ user: req.user?._id })
        .populate('track')
        .sort({ datetime: -1 });
      return res.send(results);
    } catch (error) {
      return next(error);
    }
  },
);

export default tracksRouter;
