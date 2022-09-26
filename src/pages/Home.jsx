import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Categories, ProductListing, Sort } from 'components';
import { categories, sortArray } from 'assets/static/filtersData';
import Pagination from 'components/Pagination';

const instance = axios.create({
  baseURL: 'https://632c18141aabd8373992d871.mockapi.io/',
});

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState(0);
  const [sort, setSort] = useState(sortArray[0]);
  const [pizzaCount, setPizzaCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const search = useSelector(state => state.search.value);
  const itemsPerPage = 8;

  const handlePizzaCategory = value => {
    setCategory(value);
    setCurrentPage(1);
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

  useEffect(() => {
    if (search) {
      const order = getOrder(sort);

      setLoading(true);
      setCategory(0);
      instance
        .get(
          `items?limit=${itemsPerPage}&page=1&sortBy=${sort.value}&order=${order}&search=${search}`,
        )
        .then(data => {
          const { items, count } = data?.data;
          setPizzas(items);
          setPizzaCount(count);
          setLoading(false);
        });
    }
  }, [search, sort]);

  useEffect(() => {
    if (!search) {
      const categoryBlock = category > 0 ? `&category=${category}` : '';
      const order = getOrder(sort);

      setLoading(true);
      instance
        .get(
          `items?limit=${itemsPerPage}&page=${currentPage}&sortBy=${sort.value}${categoryBlock}&order=${order}`,
        )
        .then(data => {
          const { items, count } = data?.data;
          setPizzas(items);
          setPizzaCount(count);
          setLoading(false);
        })
        .catch(console.log);
      scrollToTop();
    }
  }, [category, currentPage, sort, search]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={category}
          setValue={handlePizzaCategory}
          categories={categories}
        />
        <Sort sort={sort} setSort={setSort} sortArray={sortArray} />
      </div>
      <h2 className="content__title">
        {category ? categories[category] : 'Вся'} піца
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
