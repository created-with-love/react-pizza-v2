import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  pizzaCount: 0,
};

export const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    clearPizzas: state => {
      state.pizzas = [];
    },
    addPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
    setCount(state, action) {
      state.pizzaCount = action.payload;
    },
  },
});

export const { clearPizzas, addPizzas, setCount } = productDataSlice.actions;

export default productDataSlice.reducer;
