// import ReactPaginate from "react-paginate";
// import { useEffect, useState } from 'react';
// import './Pagination.css';

// const Pagination = ({itemsPerPage, items}) => {
//     // Example items, to simulate fetching from another resources.
//     // const [items, setItems] = useState([]);
//     const [itemOffset, setItemOffset] = useState(0);

//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     const currentItems = items.slice(itemOffset, endOffset);
//     const pageCount = Math.ceil(items.length / itemsPerPage);

//     // Invoke when user click to request another page.
//     const handlePageClick = (event) => {
//       const newOffset = (event.selected * itemsPerPage) % items.length;
//       console.log(
//         `User requested page number ${event.selected}, which is offset ${newOffset}`
//       );
//       setItemOffset(newOffset);
//     };

//     // // Parse test data from json file. 
//     // useEffect(() => {
//     // fetch('/test_data.json')
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         setItems(data);
//     //     })
//     //     .catch(error => console.error('Error fetching data:', error));
//     // }, []);

//     function PopulatedData({ currentData }) {
//     return (
//         <>
//         {currentData.map((item) => (
//             <div key={item._id}>
//             <p className="text-[#F9F6EE] text-2xl baseText">{item.name}</p>
//             </div>
//         ))};
//         </>
//     );
//     }

//     return (
//      <>
//       <PopulatedData currentData={currentItems} />
//       <ReactPaginate
//         className="react-paginate"
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//     );
// };

// export default Pagination;

import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ pageCount, handlePageClick }) => {
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
    />
  );
};

export default Pagination;
