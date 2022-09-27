import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/img/pizza-logo.svg';
import cartImg from '../assets/img/cart.svg';
import Search from './Search';
import '../scss/components/_header.scss';

const Header = () => {
  const { totalPrice, totalCount } = useSelector(state => state.cart);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
