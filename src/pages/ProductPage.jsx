import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Product from 'components/Product';
import { instance } from 'assets/static/axiosInstance';
import ProductRecommendations from 'components/ProductRecommendations/index.jsx';

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const {pizzas} = useSelector(state => state.productData);
  const [items, setItems] = useState([]);

  const currentCategoryItems = items.filter(item => item.category === product.category && item.id !== product.id);

  useEffect(() => {
    if (params && params.productId) {
      instance
      .get(`items`)
      .then(res => {
        setItems(res.data.items);
        const currentProduct = res.data.items.find(pizza => Number(pizza.id) === Number(params.productId));
        setProduct(currentProduct);
      })
      .catch(console.log);
    }
  }, [params, pizzas]);


  return (
    <div className="container">
      {Object.values(product).length > 0 && <Product product={product} />}
      <ProductRecommendations items={currentCategoryItems} />
    </div>
  );
}
