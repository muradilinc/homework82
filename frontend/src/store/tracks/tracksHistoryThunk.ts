import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { Track, TrackHistory } from '../../type';

const localStorageUser = JSON.parse(
  localStorage.getItem('persist:store:users') || '{}',
).user;
const token = JSON.parse(localStorageUser).token;

export const sendTrackToHistory = createAsyncThunk<void, string>(
  'tracks/postHistoryTrack',
  async (track) => {
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
