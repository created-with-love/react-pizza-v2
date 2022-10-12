import { CartSliceState, ICartItem } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (state: CartSliceState) => {
  return state.items.reduce((prev, cur) => {
    if (cur.quantity) {
      return prev + cur.price * cur.quantity;
    }

    return prev + cur.price;
  }, 0);
};

const getTotalCount = (state: CartSliceState) => {
  return state.items.reduce((prev, cur) => {
    if (cur.quantity) {
      return prev + cur.quantity;
    }

    return prev;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const { payload } = action;
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

      const currentItem = state.items.find(pizza => pizza.id === payload.id);

      if (isItemInCart && currentItem && currentItem.quantity) {
        currentItem.quantity++;
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
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(pizza => pizza.id !== action.payload);
      state.totalCount = getTotalCount(state);
      state.totalPrice = getTotalPrice(state);
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const currentItem = state.items.find(pizza => pizza.id === payload);

      if (currentItem && currentItem.quantity && currentItem.quantity> 1) {
        currentItem.quantity--;
      } else {
        state.items = state.items.filter(pizza => pizza.id !== payload);
      }

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

export const cartSelector = (state: RootState) => state.cart;
export const cartItemsSelector = (state: RootState) => state.cart.items;

export const { addItem, deleteItem, clearCart, decreaseItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
