import { configureStore } from '@reduxjs/toolkit';
import search from './slices/searchSlice';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';
import productData from './slices/productDataSlice';
import { loadState } from './browser-storage';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    search,
    cart,
    filter,
    productData,
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;

// useAppDispatch is needed to right type for async actions (fetchPizzas for my case)
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch