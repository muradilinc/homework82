import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { AdminContent, GlobalError } from '../../type';
import { isAxiosError } from 'axios';

export const getContents = createAsyncThunk<
  AdminContent,
  undefined,
  { rejectValue: GlobalError }
>('admin/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('/admin');
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const changeArtistStatus = createAsyncThunk<void, string>(
  'admin/change',
  async (id) => {
    await axiosApi.patch(`/artists/${id}`);
  },
);

export const changeAlbumStatus = createAsyncThunk<void, string>(
  'admin/change',
  async (id) => {
    await axiosApi.patch(`/albums/${id}`);
  },
);

export const changeTrackStatus = createAsyncThunk<void, string>(
  'admin/change',
  async (id) => {
    await axiosApi.patch(`/tracks/${id}`);
  },
);
