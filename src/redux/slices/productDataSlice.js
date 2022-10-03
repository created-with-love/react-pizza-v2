import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  pizzaCount: 0,
  status: 'loading' // loading | success | error
};

export const fetchPizzas = createAsyncThunk(
  'productData/fetchPizzas',
  async (params) => {
    const {instance, itemsPerPage, currentPage, sort, categoryBlock, order, searchQuery} = params;
    const {data} =
      await instance.get(`items?limit=${itemsPerPage}&page=${currentPage}&sortBy=${sort.value}${categoryBlock}&order=${order}${searchQuery}`);

    return data;
  }
);

export const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    clearPizzas: state => {
      state.pizzas = [];
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.pizzas = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, {payload}) => {
      const {count, items} = payload;
      state.pizzas = items;
      state.pizzaCount = count;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.pizzas = [];
    }
  },
});

export const { clearPizzas } = productDataSlice.actions;

export default productDataSlice.reducer;
