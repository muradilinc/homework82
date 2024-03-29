import express from 'express';
import Tracks from '../models/Tracks';
import mongoose, { Types } from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.post(
  '/',
  auth,
  permit('user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const track = new Tracks({
        title: req.body.title,
        number: parseInt(req.body.number),
        album: req.body.album,
        duration: req.body.duration,
        user: req.user?._id,
      });
      await track.save();
      res.send(track);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error.message);
      }
      return next(error);
    }
  },
);

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

tracksRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const result = await Tracks.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      [{ $set: { isPublished: { $eq: [false, '$isPublished'] } } }],
    );
    return res.send({ message: 'Updated!', result });
  } catch (error) {
    return next(error);
  }
});

tracksRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const query =
        req.user?.role === 'user'
          ? {
              _id: req.params.id,
              user: req.user?._id,
            }
          : {
              _id: req.params.id,
            };
      const result = await Tracks.findOneAndDelete(query);
      if (!result) {
        return res.status(403).json({ error: 'Доступ запрещен', status: 403 });
      }
      return res.send({ message: 'Deleted!', id: result._id });
    } catch (error) {
      return next(error);
    }
  },
);

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
