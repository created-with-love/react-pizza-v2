import { AxiosInstance } from 'axios';

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

export enum SortName {
  RATING = "За популярністю",
  NAME = "За алфавітом",
  PRICE_HIGH = "Спочатку дорожчі",
  PRICE_LOW = "Спочатку дешевші"
}

export enum SortValue {
  RATING = 'rating',
  PRICE = 'price',
  NAME = 'name'
}

export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc'
}

export enum Status {
  SUCCESS = "success",
  LOADING = "loading",
  ERROR = "error"
}

export interface ISort {
  name: SortName.RATING| SortName.PRICE_HIGH | SortName.PRICE_LOW | SortName.NAME;
  value: SortValue.RATING | SortValue.PRICE | SortValue.NAME;
  order?: SortOrder.DESC | SortOrder.ASC;
}

export interface IProductDataState {
  pizzaCount: number,
  status: Status.SUCCESS | Status.LOADING | Status.ERROR,
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

export interface IParams {
  instance: AxiosInstance;
  itemsPerPage: number;
  currentPage: number;
  sort: ISort;
  categoryBlock: string;
  order: string,
  searchQuery: string;
}

export interface ICartItemProps {
  id: string;
  imageUrl: string;
  name: string;
  activeType: number;
  activeSize: number;
  price: number;
  description?: string;
  quantity?: number;
  typeNames: string[];
  checkedQuantity: number;
  onMinusProductClick: (value: string) => void;
  onDeleteProductClick: (value: string) => void;
  onAddProductClick: (item: ICartItem) => void;
}