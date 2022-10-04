import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import Product from 'components/Product';
import { instance } from 'assets/static/axiosInstance';
import ProductRecommendations from 'components/ProductRecommendations/index.jsx';
import { fetchPizzas, selectPizzas } from 'redux/slices/productDataSlice';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const params = useParams();
  const pizzas = useSelector(selectPizzas);

  const currentCategoryItems = pizzas.filter(item => item.category === product.category && item.id !== product.id);

  useEffect(() => {
    const params = {
      instance,
      itemsPerPage: 25,
      currentPage: 1,
      sort: { value: 'rating' },
      categoryBlock: '',
      order: 'desc',
      searchQuery: '',
    };
    dispatch(fetchPizzas(params));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (params && params.productId && pizzas.length > 0) {
      const item = pizzas.find(obj => Number(obj.id) === Number(params.productId));
      setProduct(item || {});
    }
  }, [pizzas, params])

  return (
    <div className="container">
      {Object.values(product).length > 0 && !loading && <Product product={product} />}
      {Object.values(product).length > 0 && !loading && <ProductRecommendations items={currentCategoryItems} />}
      {loading && <ClipLoader color={"#ffffff"} loading={loading} cssOverride={override} size={250} />}
    </div>
  );
}
