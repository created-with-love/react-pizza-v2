import { useState, useEffect } from 'react';
import axios from 'axios';
import { Categories, ProductListing, Sort } from 'components';
import { categories, sortArray } from 'assets/static/filtersData';

const instance = axios.create({
  baseURL: 'https://632c18141aabd8373992d871.mockapi.io/',
});

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState(0);
  const [sort, setSort] = useState(sortArray[0]);

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

  useEffect(() => {
    const categoryBlock = category > 0 ? `&category=${category}` : '';
    const order = getOrder(sort);

    setLoading(true);
    instance
      .get(`items?sortBy=${sort.value}${categoryBlock}&order=${order}`)
      .then(({ data }) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch(console.log);
  }, [category, sort]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={category}
          setValue={setCategory}
          categories={categories}
        />
        <Sort sort={sort} setSort={setSort} sortArray={sortArray} />
      </div>
      <h2 className="content__title">
        {category ? categories[category] : 'Вся'} піца
      </h2>
      <ProductListing pizzas={pizzas} isLoading={isLoading} />
    </div>
  );
}
