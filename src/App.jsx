import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import ProductPage from 'pages/ProductPage';
import MainLayout from 'components/layouts/MainLayout';
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
