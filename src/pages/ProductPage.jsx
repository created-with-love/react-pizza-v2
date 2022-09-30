import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Product from 'components/Product';
import { instance } from 'assets/static/axiosInstance';

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const {pizzas} = useSelector(state => state.productData);

  useEffect(() => {
    if (params && params.productId) {
      const currentPizza = pizzas.find(pizza => pizza.id === Number(params.productId));

      if (currentPizza) {
        setProduct(currentPizza);
      } else {
        // request for specific pizza ID doesn't work for mockApi, so I need to use full one
        instance
        .get(`items`)
        .then(res => {
          const currentProduct = res.data.items.find(pizza => pizza.id === Number(params.productId));
          setProduct(currentProduct);
        })
        .catch(console.log);
      }

    }
  }, [params, pizzas]);


  return (
    <div className="container">
      {Object.values(product).length > 0 && <Product product={product} />}
    </div>
  );
}
