import { IProduct } from 'types';
import PizzaBlock from './PizzaBlock';
import Skeleton from './Skeleton';

interface IProductListingProps {
  pizzas: IProduct[];
  isLoading: boolean
}

const ProductListing: React.FC<IProductListingProps> = ({ pizzas, isLoading }) => {
  return (
    <div className="content__items">
      {isLoading
        ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
        : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
    </div>
  );
};

export default ProductListing;
