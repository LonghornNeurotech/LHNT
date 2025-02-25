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
import RoleFilter from '../Filter/RoleFilter';
import YearFilter from '../Filter/YearFilter';
import Profile from '../Profile/Profile';
import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'

const ProfileDisplay = () => {
  // items -> roleTaggedItems -> yearTaggedItems -> filteredItems
  const [roles, setRoles] = useState([]);
  const [items, setItems] = useState([]);
  const [roleTaggedItems, setRoleTaggedItems] = useState([]);
  const [yearTaggedItems, setYearTaggedItems] = useState([]);
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
        const response = await fetch('/officer_data.json');
        const data = await response.json();
        setItems(data);
        setRoleTaggedItems(data);
        setYearTaggedItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-8">
      <div className="mb-8 flex justify-between">
      {/* Strange naming. Filter gives tags and Search gives filtered data */}
        <Search className="w-1/4" setFilteredData={setFilteredItems} data={yearTaggedItems} />
        <div className="flex">
          <RoleFilter className="w-1/4" setTaggedData={setRoleTaggedItems} setRoles={setRoles} roles={roles} data={items}></RoleFilter>
          <YearFilter className="w-1/4" setTaggedData={setYearTaggedItems} roles={roles} data={roleTaggedItems}></YearFilter>
        </div>
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