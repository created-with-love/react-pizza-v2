import { Link } from 'react-router-dom';
import '../scss/components/_header.scss';
import logo from '../assets/img/pizza-logo.svg';
import cartImg from '../assets/img/cart.svg';
import Search from './Search';

const Header = () => {
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
            <span>520 ₴</span>
            <div className="button__delimiter"></div>
            <img
              width="18"
              src={cartImg}
              alt="Cart icon"
              className="header__cart-icon"
            />
            <span>3</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
