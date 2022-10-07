import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from 'redux/slices/filterSlice';
import { ISort } from 'types';
import arrowTop from '../assets/img/arrow-top.svg';
import arrowDown from '../assets/img/down-arrow.svg';
import '../scss/components/_sort.scss';

interface ISortProps {
  sort: ISort,
  sortArray: ISort[]
}

type M = MouseEvent & {
   path?: HTMLElement []; 
   composedPath: (tar?: HTMLElement) => EventTarget[]; 
   target: any; 
}

const Sort: React.FC<ISortProps> = ({ sort, sortArray }) => {
  const [showPopup, setShowPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const onSortItemClick = (value: ISort) => {
    dispatch(setSortType(value));
    setShowPopup(false);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const handleOutsideClick = (e: M) => {
      // e.path и его аналог для браузера firefox
      const path =
        e.path ||
        (e.composedPath && e.composedPath()) ||
        e.composedPath(e.target);
      if (sortRef.current && !path.includes(sortRef.current)) {
        setShowPopup(false);
      }
    };
    
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
};

export default Sort;
