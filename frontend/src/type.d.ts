export interface Artist {
  _id: string;
  picture: string;
  name: string;
}

export interface Routes {
  home: string;
  notPage: string;
  artists: string;
  albums: string;
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
