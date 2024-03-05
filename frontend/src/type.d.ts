export interface Artist {
  _id: string;
  picture: string;
  name: string;
}

export interface Album {
  _id: string;
  release: number;
  title: string;
  image: string | null;
  author: Artist;
  tracks: Track[];
}

export interface Track {
  _id: string;
  title: string;
  album: string;
  duration: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
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
