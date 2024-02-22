import { Model } from 'mongoose';

export interface Artist {
  name: string;
  picture: string | null;
  description: string;
}

export interface Album {
  title: string;
  author: string;
  release: number;
  image: string | null;
}

export interface Track {
  title: string;
  number: number;
  album: string;
  duration: string | null;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;

export interface TrackHistory {
  user: string;
  track: string;
  datetime: Date;
}

type TrackHistoryModel = Model<TrackHistory>;
