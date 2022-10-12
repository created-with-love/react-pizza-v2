import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const searchSlice = createSlice({
  name: 'searchValue',
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

export const { clear, setValue } = searchSlice.actions;

export default searchSlice.reducer;
