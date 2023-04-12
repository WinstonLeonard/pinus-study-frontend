import { RootState } from "../../redux/store";
import { Thread } from "../threads/threadSlice";
import { createSlice } from "@reduxjs/toolkit";

export interface User {
  Username: string;
  Token: string;
  NumberOfQuestionsAsked: number;
  NumberOfLikesReceived: number;
  RecentThreads: Thread[];
  Modules: string[];
}

export const UserInitialState : User = {
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
        Username: action.payload.Username,
        Token: action.payload.Token
      };
      return newState;
    },
  },
});

export const { login } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.Token;

export default userSlice.reducer;
