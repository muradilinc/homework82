import { Artist } from '../../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAllArtists, getArtist } from './artistsThunk';

interface ArtistsState {
  artists: Artist[];
  artist: Artist | null;
  getAllLoading: boolean;
  getSingleLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artist: null,
  getAllLoading: false,
  getSingleLoading: false,
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
    builder.addCase(getArtist.pending, (state) => {
      state.getSingleLoading = true;
    });
    builder.addCase(
      getArtist.fulfilled,
      (state, { payload: artist }: PayloadAction<Artist>) => {
        state.getSingleLoading = false;
        state.artist = artist;
      },
    );
    builder.addCase(getArtist.rejected, (state) => {
      state.getSingleLoading = false;
    });
  },
});

export const artistsReducer = artistSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtist = (state: RootState) => state.artists.artist;
export const selectAllLoading = (state: RootState) =>
  state.artists.getAllLoading;
export const selectGetSingleLoading = (state: RootState) =>
  state.artists.getSingleLoading;
