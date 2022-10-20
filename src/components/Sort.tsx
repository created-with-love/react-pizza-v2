import React, { useState, useEffect, useRef } from 'react';

import { setSortType } from 'redux/slices/filterSlice';
import { useAppDispatch } from 'redux/store';
import { ISort, SortValue } from 'types';
import arrowTop from 'assets/img/arrow-top.svg';
import arrowDown from 'assets/img/down-arrow.svg';
import 'scss/components/_sort.scss';

interface ISortProps {
  sort: ISort,
  sortArray: ISort[]
}

type PopupEvent = MouseEvent & {
   path: Node[]; 
   composedPath: (tar?: HTMLElement) => EventTarget[]; 
   target: HTMLElement; 
}

const Sort: React.FC<ISortProps> = ({ sort, sortArray }) => {
  const [showPopup, setShowPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  const onSortItemClick = (value: ISort) => {
    dispatch(setSortType(value));
    setShowPopup(false);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const _event = e as PopupEvent;
      const path =
        _event.path ||
        (_event.composedPath && _event.composedPath()) ||
        _event.composedPath(_event.target);
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
              const isPrice = item.value === SortValue.PRICE;
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

export default React.memo(Sort);
