import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
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
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  // get current pizza data
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const {data} = await instance.get('/items/' + params.productId);
        setProduct(data.items);
      } catch (e) {
        alert('Такої піци не знайдено');
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchPizza();
  }, [params, navigate]);

  // get product recommendations data
  useEffect(() => {
    if (Object.values(product).length > 0) {
      const {category} = product;
      const fetchPizzaRecommendations = async () => {
        try {
          const {data} = await instance.get(`/items?category=${category}`);
          setCarouselItems(data.items.filter(obj => Number(obj.id) !== Number(product.id)));
        } catch (e) {
          console.log('Fetch error:', e);
        }
      }
      fetchPizzaRecommendations();
    }
  }, [product])

  return (
    <div className="container">
      {Object.values(product).length > 0 && !loading && <Product product={product} />}
      {carouselItems.length > 0 && !loading && <ProductRecommendations items={carouselItems} />}
      {loading && <ClipLoader color={"#ffffff"} loading={loading} cssOverride={override} size={250} />}
    </div>
  );
}
