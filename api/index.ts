import express from 'express';
import mongoose from "mongoose";
import config from "./config";
import artistsRouter from "./routes/artists";
import albumsRouter from "./routes/albums";
import tracksRouter from "./routes/tracks";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('We r online port: ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected');
  });
};

void run();