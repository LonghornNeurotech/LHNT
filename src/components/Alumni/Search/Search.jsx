import { filter } from 'framer-motion/client';
import { useState, useEffect } from 'react';
/* 
    Search bar for the Alumni page 

    Functionality: 
    - Whenever any website visitor enters any string
        in this component, only the member profiles 
        whose names that partially matches or completely
        matches will be displayed!

    - Looks like a search bar
*/
const Search = ({setFilteredData, data}) => {
    const [query, setQuery] = useState("");
    
    useEffect(() => {
        const filteredData = data.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredData(filteredData);
    }, [query, data, setFilteredData]);

    const handleQuery = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div>
            <input placeholder={"Enter name"} onChange={handleQuery}></input>
        </div>
    );
};

export default Search;