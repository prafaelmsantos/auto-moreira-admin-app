import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import loaderSlice from './loaderSlice';
import modalSlice from './modalSlice';
import snackBarSlice from './snackBarSlice';
import darkModeSlice from './darkModeSlice';
import appModeSlice from './appModeSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    loaderSlice,
    modalSlice,
    snackBarSlice,
    darkModeSlice,
    appModeSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
