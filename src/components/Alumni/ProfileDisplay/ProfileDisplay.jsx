/* 
    ProfileDisplay component to arrange the Profile
    cards for each member 

    Functionality: 
    - Handles how each member profile card (Profile component)
        are arranged and displayed for various browser widths 

    - By default, each member profile are arranged 
        based on each member's name in alphabetical order

    - May handle pagination too!
*/

import { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';
import Profile from '../Profile/Profile';
import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'

const ProfileDisplay = () => {
  const [tags, setTags] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const offset = currentPage * itemsPerPage;
  const currentPageItems = filteredItems.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Parse test data from json file. 
  // TODO: Replace with actual data from either S3 or cached server data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/test_data.json');
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-8">
      <div className="mb-8 flex">
        <Search className="float-left w-1/4" setFilteredData={setFilteredItems} data={items} />
        <Filter className="float-right w-1/4" setSelectedTags={setTags} selectedTags={tags}></Filter>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPageItems.map((item) => (
          <Profile key={item.id} {...item} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default ProfileDisplay;