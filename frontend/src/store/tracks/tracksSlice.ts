import { TrackHistory } from '../../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTracksHistory, sendTrackToHistory } from './tracksHistoryThunk';
import { RootState } from '../../app/store';

interface TracksState {
  tracks: TrackHistory[];
  trackSendLoading: boolean;
  tracksLoading: boolean;
}

const initialState: TracksState = {
  tracks: [],
  trackSendLoading: false,
  tracksLoading: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendTrackToHistory.pending, (state) => {
      state.trackSendLoading = true;
    });
    builder.addCase(sendTrackToHistory.fulfilled, (state) => {
      state.trackSendLoading = false;
    });
    builder.addCase(sendTrackToHistory.rejected, (state) => {
      state.trackSendLoading = false;
    });
    builder.addCase(getTracksHistory.pending, (state) => {
      state.tracksLoading = true;
    });
    builder.addCase(
      getTracksHistory.fulfilled,
      (state, { payload: tracks }: PayloadAction<TrackHistory[]>) => {
        state.tracksLoading = false;
        state.tracks = tracks;
      },
    );
    builder.addCase(getTracksHistory.rejected, (state) => {
      state.tracksLoading = false;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
