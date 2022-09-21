import React from 'react';
import {Header, Categories, Sort, ProductListing} from 'components';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Вся піца</h2>
          <ProductListing />
        </div>
      </div>
    </div>
  );
}

export default App;
