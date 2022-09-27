import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from 'redux/slices/filterSlice';
import arrowTop from '../assets/img/arrow-top.svg';
import arrowDown from '../assets/img/down-arrow.svg';
import '../scss/components/_sort.scss';

export default function Sort({ sort, sortArray }) {
  const [showPopup, setShowPopup] = useState(false);
  const sortRef = useRef();
  const dispatch = useDispatch();

  const onSortItemClick = value => {
    dispatch(setSortType(value));
    setShowPopup(false);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleOutsideClick = e => {
    // e.path и его аналог для браузера firefox
    const path =
      e.path ||
      (e.composedPath && e.composedPath()) ||
      e.composedPath(e.target);
    if (!path.includes(sortRef.current)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <img
          className="sort__arrow"
          src={showPopup ? arrowTop : arrowDown}
          alt="sort-arrow"
        />
        <button type="button" onClick={handlePopup} className="sort__button">
          {sort.name}
        </button>
      </div>
      {showPopup && (
        <div className="sort__popup">
          <ul>
            {sortArray.map(item => {
              const isPrice = item.value === 'price';
              const isActive = isPrice
                ? sort.value === item.value && sort.order === item.order
                : sort.value === item.value;

              return (
                <li
                  key={item.name}
                  className={isActive ? 'active' : ''}
                  onClick={() => onSortItemClick(item)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
