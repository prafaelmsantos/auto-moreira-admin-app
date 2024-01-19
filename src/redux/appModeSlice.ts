import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppMode {
  dark: boolean;
}

const initialState: IAppMode = {
  dark: false
};

export const appModeSlice = createSlice({
  initialState,
  name: 'appModeSlice',
  reducers: {
    setAppMode: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    }
  }
});

export default appModeSlice.reducer;

export const { setAppMode } = appModeSlice.actions;
