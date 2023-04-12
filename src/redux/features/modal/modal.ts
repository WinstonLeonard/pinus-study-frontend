import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  showLogin: boolean;
  showSignup: boolean;
  showCreateAccount: boolean;
}

const ModalInitialState : ModalState = {
  showLogin: false,
  showSignup: false,
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

    toggleSignup: (state, action) => {
      const newState = {
        ...state,
        showSignup: action.payload
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

export const { toggleLogin, toggleSignup, toggleCreateAccount } = modalSlice.actions;

export const selectLoginModal = (state: RootState) => state.modal.showLogin;

export const selectSignupModal = (state: RootState) => state.modal.showSignup;

export const selectCreateAccountModal = (state: RootState) => state.modal.showCreateAccount;

export default modalSlice.reducer;
