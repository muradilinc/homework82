import mongoose from 'mongoose';
import Albums from './Albums';
import User from './User';

const tracksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const album = await Albums.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist!',
    },
  },
  duration: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
});

const Track = mongoose.model('Track', tracksSchema);
export default Track;
