import { ISort, SortName, SortValue, SortOrder } from "types";

export const sortArray: ISort[] = [
  { name: SortName.RATING, value: SortValue.RATING },
  { name: SortName.PRICE_HIGH, value: SortValue.PRICE, order: SortOrder.DESC },
  { name: SortName.PRICE_LOW, value: SortValue.PRICE, order: SortOrder.ASC },
  { name: SortName.NAME, value: SortValue.NAME },
];

export const categories = [
  'Всі',
  "М'ясна",
  'Вегетаріанська',
  'Гриль',
  'Гостра',
  'Екзотична',
];
