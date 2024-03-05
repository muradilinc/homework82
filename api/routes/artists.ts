import express from 'express';
import { imagesUpload } from '../helpers/multer';
import Artists from '../models/Artists';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = express.Router();

artistsRouter.post(
  '/',
  auth,
  permit('user'),
  imagesUpload.single('picture'),
  async (req: RequestWithUser, res, next) => {
    try {
      const artist = new Artists({
        name: req.body.name,
        picture: req.file ? req.file.filename : null,
        description: req.body.description,
        user: req.user?._id,
      });
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

artistsRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const results = await Artists.findOneAndDelete({
        _id: req.params.id,
        user: req.user?._id,
      });
      if (!results) {
        return res.status(403).json({ error: 'Доступ запрещен', status: 403 });
      }
      return res.send({ message: 'Deleted!', id: results._id });
    } catch (error) {
      return next(error);
    }
  },
);

export default artistsRouter;
