import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  showLogin: boolean;
  showCreateAccount: boolean;
  showVerifyAccount: boolean;
  showChangePassword: boolean;
}

const ModalInitialState : ModalState = {
  showLogin: false,
  showCreateAccount: false,
  showVerifyAccount: true,
  showChangePassword: false
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
    },

    toggleVerifyAccount: (state, action) => {
      const newState = {
        ...state,
        showVerifyAccount: action.payload
      };
      return newState;
    },

    toggleChangePassword: (state, action) => {
      const newState = {
        ...state,
        showChangePassword: action.payload
      };
      return newState;
    }
  },
});

export const { toggleLogin, toggleCreateAccount, toggleVerifyAccount, toggleChangePassword } = modalSlice.actions;

export const selectLoginModal = (state: RootState) => state.modal.showLogin;

export const selectCreateAccountModal = (state: RootState) => state.modal.showCreateAccount;

export const selectVerifyAccountModal = (state: RootState) => state.modal.showVerifyAccount;

export const selectChangePasswordModal = (state: RootState) => state.modal.showChangePassword;

export default modalSlice.reducer;
