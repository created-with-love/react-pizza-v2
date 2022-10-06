export interface IProduct {
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  description: string;
  id: string;
  category?: number;
  rating?: number;
}

export interface ICartItem {
  name: string;
  price: number;
  imageUrl: string;
  activeSize: number;
  activeType: number;
  id: string;
  quantity: number;
}

export interface IData {
  count: number;
  items: IProduct[]
}

export interface IDataItem {
  count: string;
  items: IProduct
}

export interface ISort {
  name: string,
  order?: string,
  value: string
}

export interface IState {
  search: {
    value: string
  },
  cart: {
    items: ICartItem[],
    totalCount: number,
    totalPrice: number
  },
  filter: {
    categoryId: number,
    currentPage: number,
    sort: ISort
  },
  productData: {
    pizzaCount: number,
    status: "success" | "loading" | "error",
    pizzas: IProduct[]
  }
}