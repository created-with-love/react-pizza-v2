import searchIcon from '../../assets/img/search.png';
import closeIcon from '../../assets/img/close.png';
import styles from './Search.module.scss';

const Search = ({ searchInput, setSearchInput }) => {
  const handleSearchInput = e => {
    setSearchInput(e.target.value);
  };

  const onCleanBtnClick = () => {
    setSearchInput('');
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
        value={searchInput}
        placeholder="Пошук піци..."
      />
      {searchInput && (
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
