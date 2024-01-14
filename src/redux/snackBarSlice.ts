import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../models/enums/MessageTypeEnum';

interface ISnackBar {
  open: boolean;
  message: string;
  type: MessageType;
}

interface ISnackBarSliceState {
  snackBar: ISnackBar;
}

const initialState: ISnackBarSliceState = {
  snackBar: {
    open: false,
    message: '',
    type: MessageType.INFO
  }
};

export const snackBarSlice = createSlice({
  initialState,
  name: 'snackBarSlice',
  reducers: {
    closeSnackBar: (state) => {
      state.snackBar = { ...state.snackBar, open: false };
    },
    setSnackBar: (state, action: PayloadAction<ISnackBar>) => {
      state.snackBar = action.payload;
    }
  }
});

export default snackBarSlice.reducer;

export const { closeSnackBar, setSnackBar } = snackBarSlice.actions;
