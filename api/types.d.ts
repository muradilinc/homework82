export interface Artist {
  name: string;
  picture: string | null;
  description: string;
}

export interface Album {
  title: string;
  author: string;
  release: Date;
  image: string | null;
}