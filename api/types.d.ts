import { Model } from 'mongoose';

export interface Artist {
  name: string;
  picture: string | null;
  description: string;
  user: string;
  isPublished: boolean;
}

export interface Album {
  title: string;
  author: string;
  release: number;
  image: string | null;
  user: string;
  isPublished: boolean;
}

export interface Track {
  title: string;
  number: number;
  album: string;
  duration: string | null;
  user: string;
  isPublished: boolean;
}

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleID?: string;
  githubID?: string;
  avatar?: string;
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;
