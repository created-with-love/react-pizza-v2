import { useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { clear, setValue } from '../../redux/slices/searchSlice';
import searchIcon from '../../assets/img/search.png';
import closeIcon from '../../assets/img/close.png';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const inputRef = useRef();

  const setStoreSearchValue = useCallback(
    debounce((string) => {
      dispatch(setValue(string));
    }, 400), []
  );

  const onChangeInput = e => {
    const path = window?.location?.pathname;
      if (path.includes('/product') || path.includes('/cart')) {
        navigate('/');
      }
    
    setSearchValue(e.target.value);
    setStoreSearchValue(e.target.value);
  };

  const onCleanBtnClick = () => {
    dispatch(clear());
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img
        src={searchIcon}
        alt="search icon"
        className={`${styles.searchIcon} ${styles.searchAbsolute}`}
      />
      <input
        onChange={onChangeInput}
        value={searchValue}
        placeholder="Пошук піци..."
        ref={inputRef}
      />
      {searchValue && (
        <button
          type="button"
          onClick={onCleanBtnClick}
          className={`${styles.cleanBtn} ${styles.searchAbsolute}`}
        >
          <img src={closeIcon} alt="search icon" className={styles.closeIcon} />
        </button>
      )}
    </div>
  );
};

export default Search;
