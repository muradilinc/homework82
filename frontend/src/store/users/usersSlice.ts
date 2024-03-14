import { AdminContent, GlobalError, User, ValidationError } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { githubLogin, googleLogin, login, register } from './usersThunk';
import { RootState } from '../../app/store';
import { getContents } from './adminThunk';

interface UsersState {
  user: User | null;
  content: AdminContent | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  adminContentLoading: boolean;
  adminContentError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  content: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  adminContentLoading: false,
  adminContentError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutState: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: data }) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: data }) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = true;
      state.loginError = error || null;
    });
    builder.addCase(getContents.pending, (state) => {
      state.adminContentLoading = true;
    });
    builder.addCase(getContents.fulfilled, (state, { payload: data }) => {
      state.adminContentLoading = false;
      state.content = data;
    });
    builder.addCase(getContents.rejected, (state, { payload: error }) => {
      state.adminContentLoading = true;
      state.adminContentError = error || null;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.adminContentLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: data }) => {
      state.adminContentLoading = false;
      state.user = data.user;
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.adminContentLoading = true;
      state.adminContentError = error || null;
    });
    builder.addCase(githubLogin.pending, (state) => {
      state.adminContentLoading = true;
    });
    builder.addCase(githubLogin.fulfilled, (state, { payload: data }) => {
      state.adminContentLoading = false;
      state.user = data.user;
    });
    builder.addCase(githubLogin.rejected, (state, { payload: error }) => {
      state.adminContentLoading = true;
      state.adminContentError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const { logoutState } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;

export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;

export const selectContent = (state: RootState) => state.users.content;
export const selectContentLoading = (state: RootState) =>
  state.users.adminContentLoading;
