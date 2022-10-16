import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IData, IProductDataState, Status, IParams } from 'types';

const initialState: IProductDataState = {
  pizzas: [],
  pizzaCount: 0,
  status: Status.LOADING // loading | success | error
};

export const fetchPizzas = createAsyncThunk<IData, IParams>(
  'productData/fetchPizzas',
  async (params) => {
    const {instance, itemsPerPage, currentPage, sort, categoryBlock, order, searchQuery} = params;
    const { data } = await instance.get<IData>(
      `items?limit=${itemsPerPage}&page=${currentPage}&sortBy=${sort.value}${categoryBlock}&order=${order}${searchQuery}`
    );

    return data;
  }
);

export const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    clearPizzas: state => {
      state.pizzas = [];
      state.status = Status.LOADING;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state: IProductDataState) => {
      state.pizzas = [];
      state.status = Status.LOADING;
    });
    
    builder.addCase(fetchPizzas.fulfilled, (state: IProductDataState, action: PayloadAction<IData>) => {
      const {count, items} = action.payload;
      state.pizzas = items;
      state.pizzaCount = count;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state: IProductDataState) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  }
});

export const { clearPizzas } = productDataSlice.actions;

export default productDataSlice.reducer;
