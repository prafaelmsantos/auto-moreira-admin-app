import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../models/enums/MessageTypeEnum';

interface IModal {
  open: boolean;
  message: string;
  title: string;
  type: MessageType;
}

interface IModalState {
  modal: IModal;
}

const initialState: IModalState = {
  modal: {
    open: false,
    message: '',
    title: '',
    type: MessageType.INFO
  }
};

export const modalSlice = createSlice({
  initialState,
  name: 'modalSlice',
  reducers: {
    closeModal: (state) => {
      state.modal = { ...state.modal, open: false };
    },
    setModal: (state, action: PayloadAction<IModal>) => {
      state.modal = action.payload;
    }
  }
});

export default modalSlice.reducer;

export const { closeModal, setModal } = modalSlice.actions;
