import { useState } from 'react';
import '../scss/components/_sort.scss';
import arrowTop from '../assets/img/arrow-top.svg';
import arrowDown from '../assets/img/down-arrow.svg';

export default function Sort() {
  const sortArray = ['популярністю', 'ціною', 'алфавітом'];
  const [activeSort, setActiveSort] = useState(sortArray[0]);
  const [showPopup, setShowPopup] = useState(false);

  const onSortItemClick = sort => {
    setActiveSort(sort);
    setShowPopup(false);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <img
          className="sort__arrow"
          src={showPopup ? arrowTop : arrowDown}
          alt="sort-arrow"
        />
        <b>Сортувати за:</b>
        <button type="button" onClick={handlePopup} className="sort__button">
          {activeSort}
        </button>
      </div>
      {showPopup && (
        <div className="sort__popup">
          <ul>
            {sortArray.map(sortOption => (
              <li
                key={sortOption}
                className={activeSort === sortOption ? 'active' : ''}
                onClick={() => onSortItemClick(sortOption)}
              >
                {sortOption}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
