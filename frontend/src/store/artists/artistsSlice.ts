import { Artist } from '../../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAllArtists } from './artistsThunk';

interface ArtistsState {
  artists: Artist[];
  getAllLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  getAllLoading: false,
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllArtists.pending, (state) => {
      state.getAllLoading = true;
    });
    builder.addCase(
      getAllArtists.fulfilled,
      (state, { payload: artist }: PayloadAction<Artist[]>) => {
        state.getAllLoading = false;
        state.artists = artist;
      },
    );
    builder.addCase(getAllArtists.rejected, (state) => {
      state.getAllLoading = false;
    });
  },
});

export const artistsReducer = artistSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectAllLoading = (state: RootState) =>
  state.artists.getAllLoading;
