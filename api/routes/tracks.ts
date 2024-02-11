import express from "express";
import {Track} from "../types";
import Tracks from "../models/Tracks";
import mongoose, {Types} from "mongoose";

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: Track = {
      title: req.body.title,
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
    if (req.query.album) {
      let _id: Types.ObjectId;
      try {
        _id = new Types.ObjectId(req.query.album as string);
      } catch {
        return res.status(404).send({error: 'Wrong album'});
      }
      results = await Tracks.find({album: _id});
    } else {
      results = await Tracks.find();
    }
    return res.send(results);
  } catch (error) {
    return next(error);
  }
});

export default tracksRouter;