import express from 'express';
import { imagesUpload } from '../helpers/multer';
import { Artist } from '../types';
import Artists from '../models/Artists';
import mongoose from 'mongoose';

const artistsRouter = express.Router();

artistsRouter.post(
  '/',
  imagesUpload.single('picture'),
  async (req, res, next) => {
    try {
      const artistData: Artist = {
        name: req.body.name,
        picture: req.file ? req.file.filename : null,
        description: req.body.description,
      };
      const artist = new Artists(artistData);
      await artist.save();
      res.send(artist);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error.message);
      }
      return next(error);
    }
  },
);

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Artists.find();
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const results = await Artists.findOne({ _id: req.params.id });
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

export default artistsRouter;
