import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import Loader from 'components/Loader';
import './scss/app.scss';

const Home = React.lazy(
  () => import(/* webpackChunkName: "Home" */ 'pages/Home'),
);
const ProductPage = React.lazy(
  () => import(/* webpackChunkName: "ProductPage" */ 'pages/ProductPage'),
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ 'pages/NotFound'),
);
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ 'pages/Cart'),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <Suspense fallback={<Loader />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
