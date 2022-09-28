import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Categories, ProductListing, Sort } from 'components';
import { categories, sortArray } from 'assets/static/filtersData';
import Pagination from 'components/Pagination';
import { setCategoryId, setPage } from 'redux/slices/filterSlice';
import { addPizzas, setCount } from 'redux/slices/productDataSlice';

const instance = axios.create({
  baseURL: 'https://632c18141aabd8373992d871.mockapi.io/',
});

export default function Home() {
  const [isLoading, setLoading] = useState(true);

  const { search, filter, productData } = useSelector(state => state);
  const { value: searchValue } = search;
  const { pizzas, pizzaCount } = productData;
  const { categoryId, sort, currentPage } = filter;

  const itemsPerPage = 8;

  const dispatch = useDispatch();

  const handlePizzaCategory = value => {
    dispatch(setCategoryId(value));
    dispatch(setPage(1));
  };

  const getOrder = sortOrder => {
    switch (sortOrder.value) {
      case 'price':
        return sortOrder.order;
      case 'name':
        return 'asc';
      default:
        return 'desc';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const setCurrentPage = page => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    if (searchValue) {
      const orderSortType = getOrder(sort);
      
      setLoading(true);
      dispatch(setCategoryId(0));

      instance
      .get(
        `items?limit=${itemsPerPage}&page=1&sortBy=${sort.value}&order=${orderSortType}&search=${searchValue}`,
      )
      .then(data => {
        const { items, count } = data?.data;
        dispatch(addPizzas(items));
        dispatch(setCount(count));
        setLoading(false);
      });
    }
  }, [searchValue, sort, dispatch]);

  useEffect(() => {
    if (!searchValue && currentPage) {
      const categoryBlock = categoryId > 0 ? `&category=${categoryId}` : '';
      const order = getOrder(sort);

      setLoading(true);
      instance
        .get(
          `items?limit=${itemsPerPage}&page=${currentPage}&sortBy=${sort.value}${categoryBlock}&order=${order}`,
        )
        .then(data => {
          const { items, count } = data?.data;
          dispatch(addPizzas(items));
          dispatch(setCount(count));
          setLoading(false);
        })
        .catch(console.log);
      scrollToTop();
    }
  }, [categoryId, currentPage, sort, searchValue, dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          setValue={handlePizzaCategory}
          categories={categories}
        />
        <Sort sort={sort} sortArray={sortArray} />
      </div>
      <h2 className="content__title">
        {categoryId ? categories[categoryId] : 'Вся'} піца
      </h2>
      <ProductListing pizzas={pizzas} isLoading={isLoading} />
      <Pagination
        count={pizzaCount}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
