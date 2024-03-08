import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { Album, AlbumMutation } from '../../type';

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'album/create',
  async (album) => {
    const formData = new FormData();
    formData.append('title', album.title);
    formData.append('release', album.release);
    formData.append('author', album.author);
    if (album.image) {
      formData.append('image', album.image);
    }
    await axiosApi.post('/albums', formData);
  },
);

export const getAlbumsByArtist = createAsyncThunk<Album[], string>(
  'albums/getAll',
  async (id) => {
    const response = await axiosApi.get<Album[]>(`/albums/?artist=${id}`);
    return response.data;
  },
);

export const getAlbum = createAsyncThunk<Album, string>(
  'albums/getOne',
  async (id) => {
    const response = await axiosApi.get<Album>(`/albums/${id}`);
    return response.data;
  },
);
