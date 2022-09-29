import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'За популярністю', value: 'rating' }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    clearCategoryId(state) {
      state.categoryId = 0;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, {payload}) {
      state.currentPage = Number(payload.currentPage);
      state.categoryId = Number(payload.categoryId);
      state.sort = payload.sortItem;
    }
  },
});

export const { setCategoryId, clearCategoryId, setSortType, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
