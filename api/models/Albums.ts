import mongoose from 'mongoose';
import Artists from './Artists';

const albumsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const artists = await Artists.findById(value);
        return Boolean(artists);
      },
      message: 'Artist does not exist!',
    },
  },
  release: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Album = mongoose.model('Album', albumsSchema);
export default Album;
