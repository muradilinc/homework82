import mongoose from 'mongoose';
import User from './User';

const ArtistsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: String,
  description: String,
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

const Artist = mongoose.model('Artist', ArtistsSchema);
export default Artist;
