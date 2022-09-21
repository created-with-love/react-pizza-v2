import PizzaBlock from './PizzaBlock';
import pizzas from '../assets/pizzas.json';

export default function ProductListing() {
  return (
    <div className="content__items">
      {pizzas.map(pizza => (
        <PizzaBlock {...pizza} key={pizza.id} />
      ))}
    </div>
  );
}
