import { useEffect } from 'react';
import { Categories, ProductListing, Sort } from 'components';

export default function Home() {
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
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Вся піца</h2>
      <ProductListing />
    </div>
  );
}
