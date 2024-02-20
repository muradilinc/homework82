import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../store/artists/artistsSlice';
import { albumsReducer } from '../store/albums/albumsSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
