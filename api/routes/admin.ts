import express from 'express';
import Artist from '../models/Artists';
import Album from '../models/Albums';
import Track from '../models/Tracks';

const adminRouter = express.Router();

adminRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    const albums = await Album.find().populate('author');
    const tracks = await Track.find();
    return res.send({ artists, albums, tracks });
  } catch (error) {
    return next(error);
  }
});

export default adminRouter;
