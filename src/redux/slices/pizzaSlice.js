import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const pizzaSlice = createSlice({
  name: 'pizzaValue',
  initialState,
  reducers: {
    clear: state => {
      state.value = '';
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { clear, setValue } = pizzaSlice.actions;

export default pizzaSlice.reducer;
