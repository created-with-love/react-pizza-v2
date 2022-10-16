import { RootState } from "redux/store";

export const cartSelector = (state: RootState) => state.cart;
export const cartItemsSelector = (state: RootState) => state.cart.items;
export const selectPizzas = (state: RootState) => state.productData.pizzas;
export const selectPizzaById = (id: string) => (state: RootState) =>
  state.productData.pizzas.find(obj => obj.id === id);