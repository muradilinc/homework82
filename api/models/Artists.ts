import mongoose from 'mongoose';

const ArtistsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: String,
  description: String,
});

const Artist = mongoose.model('Artist', ArtistsSchema);
export default Artist;
