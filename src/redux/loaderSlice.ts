import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoaderState {
  loader: boolean;
}

const initialState: ILoaderState = {
  loader: false
};

export const loaderSlice = createSlice({
  initialState,
  name: 'loaderSlice',
  reducers: {
    setToInitialLoader: () => initialState,
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    }
  }
});

export default loaderSlice.reducer;

export const { setToInitialLoader, setLoader } = loaderSlice.actions;
