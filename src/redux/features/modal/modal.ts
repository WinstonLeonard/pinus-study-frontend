import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  showLogin: boolean;
  //: boolean;
  showCreateAccount: boolean;
}

const ModalInitialState : ModalState = {
  showLogin: false,
  showCreateAccount: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: ModalInitialState,
  reducers: {
    toggleLogin: (state, action) => {
      const newState = {
        ...state,
        showLogin: action.payload
      };
      return newState;
    },

    toggleCreateAccount: (state, action) => {
      const newState = {
        ...state,
        showCreateAccount: action.payload
      };
      return newState;
    }
  },
});

export const { toggleLogin, toggleCreateAccount } = modalSlice.actions;

export const selectLoginModal = (state: RootState) => state.modal.showLogin;

export const selectCreateAccountModal = (state: RootState) => state.modal.showCreateAccount;

export default modalSlice.reducer;
