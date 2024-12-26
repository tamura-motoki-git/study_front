import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postalCodeReducer, PostalCodeState } from './postalCodeSlice';

export type RootState = {
  postalCode: PostalCodeState;
};

export const store = createStore(
  postalCodeReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState>)
);
