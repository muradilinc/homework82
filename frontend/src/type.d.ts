export interface Routes {
  home: string;
  notPage: string;
  artists: string;
  albums: string;
  signUp: string;
  signIn: string;
  history: string;
  submit: string;
}

export interface Artist {
  _id: string;
  picture: string;
  name: string;
  isPublished: boolean;
  user: string;
}

export interface Album {
  _id: string;
  release: number;
  title: string;
  image: string | null;
  author: Artist;
  tracks: Track[];
  isPublished: boolean;
  user: string;
}

export interface Track {
  _id: string;
  title: string;
  album: string;
  duration: string;
  isPublished: boolean;
  user: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory {
  _id: string;
  author: Artist;
  track: Track;
  datetime: string;
}

export interface ArtistMutation {
  name: string;
  picture: File | null;
  description: string;
}

export interface AlbumMutation {
  title: string;
  image: File | null;
  release: string;
  author: string;
}

export interface TrackMutation {
  title: string;
  number: string;
  duration: string;
  album: string;
}
