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
      let isSameIdInCart = false;
      const isItemInCart = state.items.some(pizza => {
        if (pizza.id === payload.id) {
          isSameIdInCart = true;
        }

        return (
          pizza.id === payload.id &&
          pizza.activeType === payload.activeType &&
          pizza.activeSize === payload.activeSize
        );
      });

      if (isItemInCart) {
        state.items = state.items.map(item => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        state.items.push({
          ...payload,
          quantity: 1,
          id: isSameIdInCart ? payload.id + Date.now() : payload.id,
        });
      }

      state.totalCount = getTotalCount(state);
      state.totalPrice = getTotalPrice(state);
    },
    deleteItem: (state, { payload }) => {
      state.items = state.items.filter(pizza => pizza.id !== payload);
      state.totalCount = getTotalCount(state);
      state.totalPrice = getTotalPrice(state);
    },
    decreaseItemQuantity: (state, { payload }) => {
      const currentItem = state.items.find(pizza => pizza.id === payload);
      const currentItemQuantity = currentItem.quantity;

      if (currentItemQuantity > 1) {
        state.items = state.items.map(pizza => {
          if (pizza.id === payload) {
            return { ...pizza, quantity: pizza.quantity - 1 };
          }

          return pizza;
        });
      } else {
        state.items = state.items.filter(pizza => pizza.id !== payload);
      }

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

export const {
  addItem,
  deleteItem,
  updateItem,
  clearCart,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
