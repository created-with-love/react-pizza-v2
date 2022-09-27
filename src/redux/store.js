import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import productDataSlice from './slices/productDataSlice';
import { loadState } from './browser-storage';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    filter: filterSlice,
    productData: productDataSlice,
  },
  preloadedState: loadState(),
});
