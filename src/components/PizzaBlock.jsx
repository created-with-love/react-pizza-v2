import { useState } from 'react';
import '../scss/components/_pizza-block.scss';
import '../scss/components/_button.scss';

const PizzaBlock = props => {
  const { name, price, imageUrl, sizes, types } = props;
  const [quantity, setQuantity] = useState(0);
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const typeNames = ['тонке', 'традиційне'];

  const onQuantityClick = () => {
    setQuantity(quantity + 1);
  };

  const onTypeClick = type => {
    setActiveType(type);
  };

  const onSizeClick = size => {
    setActiveSize(size);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={name} />
      <h4 className="pizza-block__title">{name}</h4>
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
          {sizes.map((size, i) => (
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
          <i>{quantity}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
