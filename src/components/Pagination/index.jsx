import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

export const Pagination = ({ count, setCurrentPage, itemsPerPage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={event => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(count / itemsPerPage)}
      renderOnZeroPageCount={null}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
