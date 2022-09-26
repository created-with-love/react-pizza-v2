import { useSelector, useDispatch } from 'react-redux';
import { clear, setValue } from '../../redux/searchSlice';
import searchIcon from '../../assets/img/search.png';
import closeIcon from '../../assets/img/close.png';
import styles from './Search.module.scss';

const Search = () => {
  const search = useSelector(state => state.search.value);
  const dispatch = useDispatch();

  const handleSearchInput = e => {
    dispatch(setValue(e.target.value));
  };

  const onCleanBtnClick = () => {
    dispatch(clear());
  };

  return (
    <div className={styles.root}>
      <img
        src={searchIcon}
        alt="search icon"
        className={`${styles.searchIcon} ${styles.searchAbsolute}`}
      />
      <input
        onChange={handleSearchInput}
        value={search}
        placeholder="Пошук піци..."
      />
      {search && (
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
