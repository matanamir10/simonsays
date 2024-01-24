import {configureStore} from '@reduxjs/toolkit';
import resultsReducer from './slices/resultsSlice';

export const store = configureStore({
  reducer: {
    resultsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
