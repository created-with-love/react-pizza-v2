import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setFilters, setPage } from 'redux/slices/filterSlice';
import { fetchPizzas } from 'redux/slices/productDataSlice';
import { clear } from 'redux/slices/searchSlice';

import { Categories, ProductListing, Sort, Pagination, Error } from 'components';
import { categories, sortArray } from 'assets/static/filtersData';
import { instance } from 'assets/static/axiosInstance';
import { ISort } from 'types';
import { RootState } from 'redux/store';

const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();

  const {
    search: { value: searchValue },
    filter: { categoryId, sort, currentPage },
    productData: { pizzas, pizzaCount, status },
  } = useSelector((state: RootState) => state);

  const itemsPerPage = 8;

  const dispatch = useDispatch();

  const handlePizzaCategory = (value: number) => {
    if (searchValue) {
      dispatch(clear());
    }
    dispatch(setCategoryId(value));
    dispatch(setPage(1));
  };

  const getOrder = (sortOrder: ISort) => {
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

  const setCurrentPage = (page: number) => {
    dispatch(setPage(page));
  };

  const getPizzas = useCallback(
    async (currentPage: number, searchQuery = '') => {
      const categoryBlock = categoryId > 0 ? `&category=${categoryId}` : '';
      const order = getOrder(sort) as string;

      // to prevent double fetch for search
      if (searchQuery && categoryBlock) {
        return;
      }

      dispatch(
        // TODO
        // @ts-ignore
        fetchPizzas({
          instance,
          itemsPerPage,
          currentPage,
          sort,
          categoryBlock,
          order,
          searchQuery,
        })
      );
    },
    [categoryId, dispatch, sort],
  );

  useEffect(() => {
    if (searchValue && status === 'success' && pizzas?.length === 0) {
      navigate('/404');
    }
  }, [status, pizzas, navigate, searchValue]);  

  // save search filters in the redux
  useEffect(() => {
    if (window?.location?.search) {
      const params = qs.parse(window.location.search.substring(1));
      const paramsPayload = {
        currentPage: Number(params.currentPage),
        categoryId: Number(params.categoryId)
      }

      const defaultSort: ISort = {
        name: "За популярністю",
        value: "rating",
        order: "desc"
      };

      if (params?.sortOrder && params.sort === 'price') {
        const sort = sortArray.find(
          item =>
            item?.order === params.sortOrder && item.value === params.sort,
        ) || defaultSort;

        dispatch(setFilters({ ...paramsPayload, sort }));
      } else {
        const sort = sortArray.find(item => item.value === params.sort) || defaultSort;
        dispatch(setFilters({ ...paramsPayload, sort }));
      }
      isSearch.current = true;
    }
  }, [dispatch]);

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
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, currentPage, sort, searchValue, navigate]);

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

export default Home;