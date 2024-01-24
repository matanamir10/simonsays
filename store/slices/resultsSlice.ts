import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
export interface Result {
  name: string;
  score: number;
}
const initialState: {results: Result[]} = {
  results: [],
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResults: (state, action: PayloadAction<Result[]>) => {
      state.results = [...action.payload];
    },
  },
});
export const {addResults} = resultsSlice.actions;
export const resultsSelector = (state: RootState) => state.resultsReducer;
export default resultsSlice.reducer;
