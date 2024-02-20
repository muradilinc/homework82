import express from 'express';
import { Album } from '../types';
import { imagesUpload } from '../helpers/multer';
import Albums from '../models/Albums';
import mongoose, { Types } from 'mongoose';
import Track from '../models/Tracks';

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: Album = {
      title: req.body.title,
      author: req.body.author,
      release: req.body.release,
      image: req.file ? req.file.filename : null,
    };

    const album = new Albums(albumData);
    await album.save();
    res.send(album);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error.message);
    }
    return next(error);
  }
});

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
      results = await Albums.find({ author: _id }).sort({ release: -1 });
      // results = await Promise.all(results.map(async (album) => {
      //   const tracks = await Track.find({ album: album._id }).sort({ number: 1 });
      //   return { ...album.toObject(), tracks };
      // }));
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

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id as string);
    } catch {
      return res.status(404).send({ error: 'Wrong artist' });
    }
    const result = await Albums.findById({ _id }).populate('author');
    const tracks = await Track.find({ album: _id });
    return res.send({ ...result?.toObject(), tracks });
  } catch (error) {
    return next(error);
  }
});

export default albumsRouter;
