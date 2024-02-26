import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { TrackHistory } from '../../type';

export const sendTrackToHistory = createAsyncThunk<void, string>(
  'tracks/postHistoryTrack',
  async (track) => {
    const localStorageUser = JSON.parse(
      localStorage.getItem('persist:store:users') || '{}',
    ).user;
    const token = JSON.parse(localStorageUser).token;

    await axiosApi.post(
      '/tracks/tracks_history',
      {
        track: track,
      },
      {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      },
    );
  },
);

export const getTracksHistory = createAsyncThunk<TrackHistory[]>(
  'tracks/getHistoryTracks',
  async () => {
    const localStorageUser = JSON.parse(
      localStorage.getItem('persist:store:users') || '{}',
    ).user;
    const token = JSON.parse(localStorageUser).token;

    const response = await axiosApi.get<TrackHistory[]>(
      '/tracks/tracks_history',
      {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      },
    );
    return response.data;
  },
);
