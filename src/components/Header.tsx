import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from './Search';
import { clear } from 'redux/slices/searchSlice';
import { useAppDispatch } from 'redux/store';
import { cartSelector } from 'redux/selectors';
import logo from 'assets/img/pizza-logo.svg';
import cartImg from 'assets/img/cart.svg';
import 'scss/components/_header.scss';

const Header: React.FC = () => {
  const { totalPrice, totalCount }: { totalPrice: number; totalCount: number } =
    useSelector(cartSelector);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const onLogoClick = () => {
    dispatch(clear());
  };

  return (
    <div className="header">
      <div className="container">
        <Link to="/" onClick={onLogoClick}>
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>Найсмачніша піца у Всесвіті</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          {pathname !== '/cart' && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₴</span>
              <div className="button__delimiter"></div>
              <img
                width="18"
                src={cartImg}
                alt="Cart icon"
                className="header__cart-icon"
              />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
