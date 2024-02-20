import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { Artist } from '../../type';

export const getAllArtists = createAsyncThunk<Artist[]>(
  'artists/getAll',
  async () => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  },
);
