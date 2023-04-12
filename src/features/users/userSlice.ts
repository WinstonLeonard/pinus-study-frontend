import { RootState } from "../../redux/store";
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

export const UserInitialState : User = {
  Id: 0,
  Username: "",
  Token: "",
  NumberOfQuestionsAsked: 999,
  NumberOfLikesReceived: 999,
  RecentThreads: [],
  Modules: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      const newState = {
        ...state,
        Id: action.payload.Id,
        Token: action.payload.Token
      };
      return newState;
    },
  },
});

export const { login } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.Token;

export const selectId = (state: RootState) => state.user.Id;

export default userSlice.reducer;
