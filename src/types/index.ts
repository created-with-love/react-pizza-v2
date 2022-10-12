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
  quantity?: number;
  description?: string;
}

export interface IAddToCartItem {
  name: string;
  price: number;
  imageUrl: string;
  activeSize: number;
  activeType: number;
  id: string;
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
  name: "За популярністю" | "Спочатку дорожчі" | "Спочатку дешевші" | "За алфавітом";
  value: "rating" | "price" | "name";
  order?: "desc" | "asc";
}

export interface IProductDataState {
  pizzaCount: number,
  status: "success" | "loading" | "error",
  pizzas: IProduct[]
}

export interface CartSliceState {
  items: ICartItem[];
  totalPrice: number;
  totalCount: number;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sort: ISort;
}