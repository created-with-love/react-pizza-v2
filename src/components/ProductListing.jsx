import { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaBlock from './PizzaBlock';

const instance = axios.create({
  baseURL: 'https://632c18141aabd8373992d871.mockapi.io/',
  timeout: 0,
});

export default function ProductListing() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    if (!pizzas.length) {
      instance
        .get('items')
        .then(res => setPizzas(res.data))
        .catch(console.log);
    }
  }, [pizzas]);

  return (
    <div className="content__items">
      {pizzas.map(pizza => (
        <PizzaBlock {...pizza} key={pizza.id} />
      ))}
    </div>
  );
}
