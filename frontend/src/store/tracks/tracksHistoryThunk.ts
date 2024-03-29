import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { TrackHistory, TrackMutation } from '../../type';

export const sendTrackToHistory = createAsyncThunk<void, string>(
  'tracks/postHistoryTrack',
  async (track) => {
    await axiosApi.post('/tracks/tracks_history', {
      track: track,
    });
  },
);

export const getTracksHistory = createAsyncThunk<TrackHistory[]>(
  'tracks/getHistoryTracks',
  async () => {
    const response = await axiosApi.get<TrackHistory[]>(
      '/tracks/tracks_history',
    );
    return response.data;
  },
);

export const createTrack = createAsyncThunk<void, TrackMutation>(
  'tracks/create',
  async (track) => {
    await axiosApi.post('/tracks', track);
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/delete',
  async (id) => {
    await axiosApi.delete(`/tracks/${id}`);
  },
);
