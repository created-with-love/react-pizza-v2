import { Routes, Route } from 'react-router-dom';
import { Header } from 'components';
import Home from 'pages/Home';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import ProductPage from 'pages/ProductPage';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
