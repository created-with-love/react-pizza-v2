import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Categories, ProductListing, Sort } from 'components';
import { categories, sortArray } from 'assets/static/filtersData';
import Pagination from 'components/Pagination';
import Error from 'components/Error';
import { setCategoryId, setFilters, setPage } from 'redux/slices/filterSlice';
import { fetchPizzas } from 'redux/slices/productDataSlice';
import { instance } from 'assets/static/axiosInstance';

export default function Home() {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();

  const { search, filter, productData } = useSelector(state => state);
  const { value: searchValue } = search;
  const { pizzas, pizzaCount, status } = productData;
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

  const getPizzas = useCallback(
    async (currentPage, searchQuery = '') => {
      const categoryBlock = categoryId > 0 ? `&category=${categoryId}` : '';
      const order = getOrder(sort);
      dispatch(fetchPizzas({instance, itemsPerPage, currentPage, sort, categoryBlock, order, searchQuery}));
    },
    [categoryId, dispatch, sort],
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
      const searchQuery = `&search=${searchValue}`;
      dispatch(setCategoryId(0));
      getPizzas(1, searchQuery);
    }
  }, [searchValue, sort, dispatch, getPizzas]);

  // fetch items with first/new request
  useEffect(() => {
    if (!searchValue && !isSearch.current) {
      getPizzas(currentPage);
      scrollToTop();
    }

    isSearch.current = false;
  }, [getPizzas, searchValue, currentPage]);

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

      {status === 'error' ? (
        <Error />
      ) : (
        <>
          <h2 className="content__title">
            {categoryId ? categories[categoryId] : 'Вся'} піца
          </h2>
          <ProductListing pizzas={pizzas} isLoading={status === 'loading'} />
        </>
      )}
      {pizzas.length > 0 && (
        <Pagination
          count={pizzaCount}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage - 1}
        />
      )}
    </div>
  );
}
