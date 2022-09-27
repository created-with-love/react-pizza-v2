import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
  },
});
