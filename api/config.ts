import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv();

const rootPath = __dirname;
const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    db: 'mongodb://localhost/musics',
  },
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  },
  github: {
    clientId: process.env['GITHUB_CLIENT_ID']
  }
};

export default config;
