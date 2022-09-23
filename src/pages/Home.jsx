import { Categories, ProductListing, Sort } from 'components';

export default function Home() {
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Вся піца</h2>
      <ProductListing />
    </>
  );
}
