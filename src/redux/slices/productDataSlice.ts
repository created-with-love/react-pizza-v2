import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from 'redux/store';
import { IData, IProductDataState, ISort } from 'types';

interface IParams {
  instance: AxiosInstance;
  itemsPerPage: number;
  currentPage: number;
  sort: ISort;
  categoryBlock: string;
  order: string,
  searchQuery: string;
}

const initialState: IProductDataState = {
  pizzas: [],
  pizzaCount: 0,
  status: 'loading' // loading | success | error
};

export const fetchPizzas = createAsyncThunk(
  'productData/fetchPizzas',
  async (params: IParams) => {
    const {instance, itemsPerPage, currentPage, sort, categoryBlock, order, searchQuery} = params;
    const { data } = await instance.get(
      `items?limit=${itemsPerPage}&page=${currentPage}&sortBy=${sort.value}${categoryBlock}&order=${order}${searchQuery}`
    );

    console.log("🚀 ~ file: productDataSlice.ts ~ line 27 ~ data", data);

    return data;
  }
);

export const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    clearPizzas: state => {
      state.pizzas = [];
      state.status = 'loading';
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state: IProductDataState) => {
      state.pizzas = [];
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state: IProductDataState, action: PayloadAction<IData>) => {
      const {count, items} = action.payload;
      state.pizzas = items;
      state.pizzaCount = count;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state: IProductDataState) => {
      state.status = 'error';
      state.pizzas = [];
    }
  },
});

export const selectPizzas = (state: RootState) => state.productData.pizzas;
export const selectPizzaById = (id: string) => (state: RootState) =>
  state.productData.pizzas.find(obj => obj.id === id);

export const { clearPizzas } = productDataSlice.actions;

export default productDataSlice.reducer;
