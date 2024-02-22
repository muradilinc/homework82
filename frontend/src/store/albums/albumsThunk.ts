import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { Album } from '../../type';

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
