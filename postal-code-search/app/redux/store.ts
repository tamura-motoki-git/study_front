import { configureStore } from '@reduxjs/toolkit';
import postalCodeReducer from './postalCodeSlice';

export const store = configureStore({
  reducer: {
    postalCode: postalCodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
