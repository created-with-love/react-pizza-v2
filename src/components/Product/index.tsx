import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { addItem } from 'redux/slices/cartSlice';
import { useAppDispatch } from 'redux/store';
import { cartItemsSelector } from 'redux/selectors';
import { ICartItem, IProduct } from 'types';

import 'scss/components/_pizza-block.scss';
import 'scss/components/_button.scss';
import styles from './Product.module.scss';

interface IProductProps {
  product: IProduct
}

const Product :React.FC<IProductProps> = ({ product }) => {
  const { name, price, imageUrl, sizes, types, description, id } = product;
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const cartItems: ICartItem[] = useSelector(cartItemsSelector);
  const dispatch = useAppDispatch();

  const currentCartItems = cartItems.filter((item: ICartItem) => item.name === name);
  const currentQuantityInCart =
    currentCartItems.length > 0
      ? currentCartItems.reduce((prev: number, cur: ICartItem) => {
          if (cur.quantity) {
            return prev + cur.quantity;
          }

          return prev;
        }, 0)
      : 0;
  
  const typeNames = ['тонке', 'традиційне'];

  useEffect(() => {
    setActiveSize(sizes[0]);
  }, [sizes]);

  const onQuantityClick = () => {
    dispatch(addItem({ name, price, imageUrl, activeType, activeSize, id }));
  };

  const onTypeClick = (type: number): void => {
    setActiveType(type);
  };

  const onSizeClick = (size: number): void => {
    setActiveSize(size);
  };

  return (
    <div className={styles.productWrapper}>
      <div className={styles.product}>
        <div className={styles.imageWrapper}>
          <img className={styles.product__image} src={imageUrl} alt={name} />
        </div>
        <div className={styles.product__contentWrapper}>
          <h4 className={styles.product__title}>{name}</h4>
          <p className={styles.product__description}>{description}</p>
          <div className={styles.product__selector}>
            <ul>
              {types.map(type => (
                <li
                  key={`${name}-${type}`}
                  className={activeType === type ? styles.active : ''}
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
                  className={activeSize === size ? styles.active : ''}
                  onClick={() => onSizeClick(size)}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.product__bottom}>
            <div className={styles.product__price}>від {price} ₴</div>
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
              <i>{currentQuantityInCart}</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
