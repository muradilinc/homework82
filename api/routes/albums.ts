import express from 'express';
import { imagesUpload } from '../helpers/multer';
import Albums from '../models/Albums';
import mongoose, { Types } from 'mongoose';
import Track from '../models/Tracks';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import ignoreAuth from '../middleware/ignoreAuth';

const albumsRouter = express.Router();

albumsRouter.post(
  '/',
  auth,
  permit('user'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const album = new Albums({
        title: req.body.title,
        author: req.body.author,
        release: parseInt(req.body.release),
        image: req.file ? req.file.filename : null,
        user: req.user?._id,
      });
      await album.save();
      res.send(album);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error.message);
      }
      return next(error);
    }
  },
);

albumsRouter.get('/', async (req, res, next) => {
  try {
    let results;
    if (req.query.artist) {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.query.artist as string);
      } catch {
        return res.status(404).send({ error: 'Wrong artist' });
      }
      results = await Albums.aggregate([
        {
          $match: { author: _id },
        },
        {
          $sort: { release: -1 },
        },
        {
          $lookup: {
            from: 'tracks',
            localField: '_id',
            foreignField: 'album',
            as: 'tracks',
          },
        },
      ]);
    } else {
      results = await Albums.find();
    }
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.get(
  '/:id',
  ignoreAuth,
  async (req: RequestWithUser, res, next) => {
    try {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.params.id as string);
      } catch {
        return res.status(404).send({ error: 'Wrong artist' });
      }
      const result = await Albums.findById({ _id }).populate('author');
      const tracks = await Track.find({
        $or: [
          { isPublished: true, album: _id },
          { album: _id, isPublished: false, user: req.user?._id },
        ],
      }).sort({ number: 1 });
      return res.send({ ...result?.toObject(), tracks });
    } catch (error) {
      return next(error);
    }
  },
);

albumsRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const result = await Albums.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      [{ $set: { isPublished: { $eq: [false, '$isPublished'] } } }],
    );
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.delete(
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
      const results = await Albums.findOneAndDelete(query);
      if (!results) {
        return res.status(403).json({ error: 'Доступ запрещен', status: 403 });
      }
      return res.send({ message: 'Deleted!', id: results._id });
    } catch (error) {
      return next(error);
    }
  },
);

export default albumsRouter;
