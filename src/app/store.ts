import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ticketsListReduser from '../features/ticketsList/ticketsListSlice';

export const store = configureStore({
  reducer: {
    ticketsList: ticketsListReduser,
  },
});

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
