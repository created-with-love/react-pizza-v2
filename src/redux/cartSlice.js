import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = state => {
  return state.items.reduce((prev, cur) => {
    return prev + cur.price * cur.quantity;
  }, 0);
};

const getTotalCount = state => {
  return state.items.reduce((prev, cur) => {
    return prev + cur.quantity;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const isItemInCart = state.items.some(
        pizza =>
          pizza.id === payload.id &&
          pizza.activeType === payload.activeType &&
          pizza.activeSize === payload.activeSize,
      );

      if (isItemInCart) {
        state.items = state.items.map(item => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }

      state.totalCount = getTotalCount(state);
      state.totalPrice = getTotalPrice(state);
    },
    deleteItem: (state, { id }) => {
      state.items = state.items.filter(pizza => pizza.id !== id);
      state.totalCount = getTotalCount(state);
      state.totalPrice = getTotalPrice(state);
    },
    updateItem: (state, { payload }) => {
      state.items = state.items.map(pizza => {
        if (pizza.id === payload.id) {
          return payload;
        }

        return pizza;
      });
      state.totalCount = getTotalCount(state);
      state.totalPrice = getTotalPrice(state);
    },
    clearCart: state => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, deleteItem, updateItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
