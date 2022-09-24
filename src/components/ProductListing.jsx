import PizzaBlock from './PizzaBlock';
import Skeleton from './Skeleton';

export default function ProductListing({ pizzas, isLoading }) {
  return (
    <div className="content__items">
      {isLoading
        ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
        : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
    </div>
  );
}
