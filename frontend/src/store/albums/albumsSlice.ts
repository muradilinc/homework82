import { Album } from '../../type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAlbum, getAlbumsByArtist } from './albumsThunk';
import { RootState } from '../../app/store';

interface AlbumsState {
  albums: Album[];
  album: Album | null;
  getAlbumsLoading: boolean;
  getSingleAlbumLoading: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  album: null,
  getAlbumsLoading: false,
  getSingleAlbumLoading: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbumsByArtist.pending, (state) => {
      state.getAlbumsLoading = true;
    });
    builder.addCase(
      getAlbumsByArtist.fulfilled,
      (state, { payload: albums }: PayloadAction<Album[]>) => {
        state.getAlbumsLoading = false;
        state.albums = albums;
      },
    );
    builder.addCase(getAlbumsByArtist.rejected, (state) => {
      state.getAlbumsLoading = false;
    });
    builder.addCase(getAlbum.pending, (state) => {
      state.getSingleAlbumLoading = true;
    });
    builder.addCase(
      getAlbum.fulfilled,
      (state, { payload: album }: PayloadAction<Album>) => {
        state.getSingleAlbumLoading = false;
        state.album = album;
      },
    );
    builder.addCase(getAlbum.rejected, (state) => {
      state.getSingleAlbumLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbum = (state: RootState) => state.albums.album;
export const selectGetAlbumLoading = (state: RootState) =>
  state.albums.getAlbumsLoading;
export const selectGetSingleAlbumLoading = (state: RootState) =>
  state.albums.getSingleAlbumLoading;
