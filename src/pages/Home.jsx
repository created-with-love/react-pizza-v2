import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Categories, ProductListing, Sort } from 'components';
import { categories, sortArray } from 'assets/static/filtersData';
import Pagination from 'components/Pagination';
import { setCategoryId, setFilters, setPage } from 'redux/slices/filterSlice';
import { addPizzas, setCount } from 'redux/slices/productDataSlice';
import { instance } from 'assets/static/axiosInstance';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();

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

  const fetchPizzas = useCallback(
    () => {
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
    },
    [categoryId, currentPage, dispatch, sort],
  );
  
  // save search filters in the redux
  useEffect(() => {
    if (window?.location?.search) {
      const params = qs.parse(window.location.search.substring(1));

      if (params?.sortOrder && params.sort === 'price') {
        const sortItem = sortArray.find(item => item?.order === params.sortOrder && item.value === params.sort);
        dispatch(setFilters({ ...params, sortItem }));
      } else {
        const sortItem = sortArray.find(item => item.value === params.sort);
        dispatch(setFilters({ ...params, sortItem }));
      }
      isSearch.current = true;
    }
  }, []);

  // fetch items with search
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

  // fetch items with first/new request
  useEffect(() => {
    if (!searchValue && !isSearch.current) {
      fetchPizzas();
      scrollToTop();
    }

    isSearch.current = false;
  }, [fetchPizzas, searchValue]);

  // save filters in the url params
  useEffect(() => {
    // to prevent changing url with filters on first render
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.value,
        sortOrder: sort?.order ? sort.order : 'desc',
        categoryId,
        currentPage
      });
  
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, currentPage, sort, searchValue, navigate])

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
        currentPage={currentPage - 1}
      />
    </div>
  );
}
