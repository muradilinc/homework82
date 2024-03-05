import mongoose from 'mongoose';

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
});

const Artist = mongoose.model('Artist', ArtistsSchema);
export default Artist;
