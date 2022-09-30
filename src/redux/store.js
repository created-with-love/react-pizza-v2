import { configureStore } from '@reduxjs/toolkit';
import search from './slices/searchSlice';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';
import productData from './slices/productDataSlice';
import { loadState } from './browser-storage';

export const store = configureStore({
  reducer: {
    search,
    cart,
    filter,
    productData,
  },
  preloadedState: loadState(),
});
