import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, ISort, SortName, SortValue } from 'types';

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: SortName.RATING, value: SortValue.RATING }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    clearCategoryId(state) {
      state.categoryId = 0;
    },
    setSortType(state, action: PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      const { payload } = action
      state.currentPage = payload.currentPage;
      state.categoryId = payload.categoryId;
      state.sort = payload.sort;
    }
  },
});

export const { setCategoryId, clearCategoryId, setSortType, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
