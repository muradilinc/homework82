import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { Artist, ArtistMutation } from '../../type';

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async (artist) => {
    const formData = new FormData();
    formData.append('name', artist.name);
    if (artist.picture) {
      formData.append('picture', artist.picture);
    }
    formData.append('description', artist.description);
    await axiosApi.post('/artists', formData);
  },
);

export const getAllArtists = createAsyncThunk<Artist[]>(
  'artists/getAll',
  async () => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  },
);

export const getArtist = createAsyncThunk<Artist, string>(
  'artists/getOne',
  async (id) => {
    const response = await axiosApi.get<Artist>(`/artists/${id}`);

    if (!response.data) {
      throw new Error('Not found!');
    }

    return response.data;
  },
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/delete',
  async (id) => {
    await axiosApi.delete(`/artists/${id}`);
  },
);
