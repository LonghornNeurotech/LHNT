import { useEffect, useState } from 'react';

import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'
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
const ProfileDisplay = () => {

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Parse test data from json file. 
  useEffect(() => {
  fetch('/test_data.json')
      .then(response => response.json())
      .then(data => {
          setItems(data);
          setFilteredItems(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return(
    <div>
      <Search setFilteredData={setFilteredItems} data={items}/>
      <Pagination itemsPerPage={3} items={filteredItems}/>
    </div>
  );

};

export default ProfileDisplay;