import { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaBlock from './PizzaBlock';
import Skeleton from './Skeleton';

const instance = axios.create({
  baseURL: 'https://632c18141aabd8373992d871.mockapi.io/',
});

export default function ProductListing() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get('items')
      .then(({ data }) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="content__items">
      {isLoading
        ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
        : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
    </div>
  );
}
