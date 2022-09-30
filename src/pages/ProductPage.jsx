import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import Product from 'components/Product';
import { instance } from 'assets/static/axiosInstance';
import ProductRecommendations from 'components/ProductRecommendations/index.jsx';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const {pizzas} = useSelector(state => state.productData);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const currentCategoryItems = items.filter(item => item.category === product.category && item.id !== product.id);

  useEffect(() => {
    if (params && params.productId) {
      instance
      .get(`items`)
      .then(res => {
        setItems(res.data.items);
        const currentProduct = res.data.items.find(pizza => Number(pizza.id) === Number(params.productId));
        setProduct(currentProduct);
        setLoading(false);
      })
      .catch(console.log);
    }
  }, [params, pizzas]);


  return (
    <div className="container">
      {Object.values(product).length > 0 && !loading && <Product product={product} />}
      {Object.values(product).length > 0 && !loading && <ProductRecommendations items={currentCategoryItems} />}
      {loading && <ClipLoader color={"#ffffff"} loading={loading} cssOverride={override} size={250} />}
    </div>
  );
}
