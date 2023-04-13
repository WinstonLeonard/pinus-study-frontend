import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlice';
import modalReducer from './features/modal/modal';

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
