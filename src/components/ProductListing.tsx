import { IProduct } from 'types';
import PizzaBlock from './PizzaBlock';
import Skeleton from './Skeleton';

interface IProductListingProps {
  pizzas: IProduct[];
  isLoading: boolean
}

export default function ProductListing({ pizzas, isLoading }: IProductListingProps) {
  return (
    <div className="content__items">
      {isLoading
        ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
        : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
    </div>
  );
}
