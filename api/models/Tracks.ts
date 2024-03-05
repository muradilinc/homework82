import mongoose from 'mongoose';
import Albums from './Albums';

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
});

const Track = mongoose.model('Track', tracksSchema);
export default Track;
