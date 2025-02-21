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
        <div className="w-full">
            <input
                type="text" 
                className="w-full px-4 py-3 text-lg rounded-md shadow-sm focus:ring focus:ring-opacity-50 transition-colors duration-300 bg-bone-white border-silver-lake-blue text-prussian-blue"
                placeholder={"Enter name"} 
                value={query}
                onChange={handleQuery}
            />
        </div>
    );
};

export default Search;