import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from 'components';
import Home from 'pages/Home';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import './scss/app.scss';

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="wrapper">
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchInput={searchInput} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
