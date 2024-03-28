import { RootState } from "../../store";
import { Thread } from "../threads/threadSlice";
import { createSlice } from "@reduxjs/toolkit";

export interface User {
  Id: number;
  Username: string;
  Token: string;
  NumberOfQuestionsAsked: number;
  NumberOfLikesReceived: number;
  RecentThreads: Thread[];
  Modules: string[];
}

export const UserInitialState: User = {
  Id: 0,
  Username: "",
  Token: "",
  NumberOfQuestionsAsked: 999,
  NumberOfLikesReceived: 999,
  RecentThreads: [],
  Modules: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: { ...UserInitialState },
  reducers: {
    login: (state, action) => {
      const newState = {
        ...state,
        Id: action.payload.Id,
        Token: action.payload.Token,
      };
      return newState;
    },

    updateUser: (state, action) => {
      const newState = {
        ...state,
        Username: action.payload.Username,
        NumberOfQuestionsAsked: action.payload.NumberOfQuestionsAsked,
        NumberOfLikesReceived: action.payload.NumberOfLikesReceived,
        RecentThreads: action.payload.RecentThreads,
        Modules: action.payload.Modules,
      };
      return newState;
    },

    addSubscription: (state, action) => {
      if (state.Modules.includes(action.payload)) {
        return state;
      }

      const newState = {
        ...state,
        Modules: [...state.Modules, action.payload],
      };
      return newState;
    },

    deleteSubscription: (state, action) => {
      const newState = {
        ...state,
        Modules: state.Modules.filter((name) => name !== action.payload),
      };
      return newState;
    },

    logout: (state) => {
      console.log(state);
      return { ...UserInitialState };
    },
  },
});

export const {
  login,
  updateUser,
  logout,
  addSubscription,
  deleteSubscription,
} = userSlice.actions;

export const selectToken = (state: RootState) => state.user.Token;

export const selectId = (state: RootState) => state.user.Id;

export const selectUsername = (state: RootState) => state.user.Username;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
