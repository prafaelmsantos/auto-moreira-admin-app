import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMarksMode {
  dark: boolean;
}

const initialState: IMarksMode = {
  dark: true
};

export const darkModeSlice = createSlice({
  initialState,
  name: 'darkModeSlice',
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    }
  }
});

export default darkModeSlice.reducer;

export const { setDarkMode } = darkModeSlice.actions;
