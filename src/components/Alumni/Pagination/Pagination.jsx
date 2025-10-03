/* 
  Pagination component
  - Handles pagination functionality to display a specific 
    group of Alumni profile cards.
*/
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ pageCount, handlePageClick, currentPage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
      forcePage={currentPage}
    />
  );
};

export default Pagination;
