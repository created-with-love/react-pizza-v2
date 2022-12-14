import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from 'redux/slices/cartSlice';
import { ICartItem, IProduct } from 'types';
import { cartItemsSelector } from 'redux/selectors';
import { useAppDispatch } from 'redux/store';
import 'scss/components/_pizza-block.scss';
import 'scss/components/_button.scss';

const PizzaBlock: React.FC<IProduct> = props => {
  const { name, price, imageUrl, sizes, types, description, id } = props;
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const cartItems: ICartItem[] = useSelector(cartItemsSelector);

  const currentCartItems: ICartItem[] = cartItems.filter(item => item.name === name);
  const currentQuantityInCart =
    currentCartItems.length > 0
      ? currentCartItems.reduce((prev, cur) => {
        if (cur.quantity) {
          return prev + cur.quantity;
        }

        return prev;
        }, 0)
      : 0;

  const dispatch = useAppDispatch();
  const typeNames = ['тонке', 'традиційне'];

  const onQuantityClick = () => {
    dispatch(addItem({ name, price, imageUrl, activeType, activeSize, id }));
  };

  const onTypeClick = (type: number) => {
    setActiveType(type);
  };

  const onSizeClick = (size: number) => {
    setActiveSize(size);
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
      <Link to={`/product/${id}`} className="pizza-block__pdp-link">
        <img className="pizza-block__image" src={imageUrl} alt={name} width="260" height={260} />
        <h4 className="pizza-block__title">
        {name}
        </h4>
        </Link>
        <p className="pizza-block__description">{description}</p>
        <div className="pizza-block__selector">
          <ul>
            {types.map(type => (
              <li
                key={`${name}-${type}`}
                className={activeType === type ? 'active' : ''}
                onClick={() => onTypeClick(type)}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map(size => (
              <li
                key={`${name}-${size}`}
                className={activeSize === size ? 'active' : ''}
                onClick={() => onSizeClick(size)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">від {price} ₴</div>
          <button
            className="button button--outline button--add"
            type="button"
            onClick={onQuantityClick}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Додати</span>
            {currentQuantityInCart > 0 && <i>{currentQuantityInCart}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
