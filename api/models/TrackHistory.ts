import mongoose from 'mongoose';
import Tracks from './Tracks';
import Artists from './Artists';

const Schema = mongoose.Schema;

const trackHistorySchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const track = await Tracks.findById(value);
        return Boolean(track);
      },
      message: 'Track does not exist!',
    },
  },
  datetime: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const artists = await Artists.findById(value);
        return Boolean(artists);
      },
      message: 'Artist does not exist!',
    },
  },
});

const TrackHistory = mongoose.model('TrackHistory', trackHistorySchema);

export default TrackHistory;
