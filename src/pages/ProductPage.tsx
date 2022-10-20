import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Product, ProductRecommendations } from 'components';
import { instance } from 'assets/static/axiosInstance';
import { IData, IDataItem, IProduct } from 'types';
import { isEmpty } from 'helpers';
import Loader from 'components/Loader';

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<IProduct>({
    name: '',
    price: 0,
    imageUrl: '',
    sizes: [],
    types: [],
    description: '',
    id: '',
    category: 0
  });
  const [carouselItems, setCarouselItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const navigate = useNavigate();

  // get current pizza data
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data }: {data: IDataItem} = await instance.get('/items/' + params.productId);
        setProduct(data.items);
      } catch (e) {
        alert('Такої піци не знайдено');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchPizza();
  }, [params, navigate]);

  // get product recommendations data
  useEffect(() => {
    if (!isEmpty(product)) {
      const { category } = product;
      const fetchPizzaRecommendations = async () => {
        try {
          const { data }: {data: IData} = await instance.get(`/items?category=${category}`);
          setCarouselItems(data.items.filter(
            (obj: IProduct) => Number(obj.id) !== Number(product.id),
          ));
        } catch (e) {
          console.log('Fetch error:', e);
        }
      };
      fetchPizzaRecommendations();
    }
  }, [product]);

  return (
    <div className="container">
      {!isEmpty(product) && !loading && <Product product={product} />}
      {carouselItems.length > 0 && !loading && (
        <ProductRecommendations items={carouselItems} />
      )}
      {loading && (
        <Loader 
          color={'#ffffff'}
          loading={loading}
          size={250}
        />
      )}
    </div>
  );
}

export default ProductPage;