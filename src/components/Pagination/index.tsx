import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  count: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  currentPage: number;
}

export const Pagination = ({
  count,
  setCurrentPage,
  itemsPerPage,
  currentPage,
}: IPaginationProps) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={event => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(count / itemsPerPage)}
      renderOnZeroPageCount={() => null}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
