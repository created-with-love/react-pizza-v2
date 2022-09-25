import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from 'components';
import Home from 'pages/Home';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchInput={searchInput} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
