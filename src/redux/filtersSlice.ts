import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelectedFilters, defaultFilters } from '../models/Filter';

interface IFilterState {
  filters: ISelectedFilters;
}

const initialState: IFilterState = {
  filters: defaultFilters
};

export const filtersSlice = createSlice({
  initialState,
  name: 'filtersSlice',
  reducers: {
    removeFilters: () => initialState,
    setFilters: (state, action: PayloadAction<ISelectedFilters>) => {
      state.filters = action.payload;
    }
  }
});

export default filtersSlice.reducer;

export const { removeFilters, setFilters } = filtersSlice.actions;
