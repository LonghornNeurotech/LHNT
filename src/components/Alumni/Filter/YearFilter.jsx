/* 
    Filter button for Alumni page 

    Functionality: 

    - Will filter the display of member profiles 
        based on year and on the member's roles in 
        Longhorn Neurotech!
    - Filters whatever is in the tags array
*/
import React, { useState, useEffect } from 'react';
import './Filter.css';

const YearFilter = ({setTaggedData, roles, data}) => {
    const [checkboxesVisible, setCheckboxesVisible] = useState(false);
    const tags = ["2024", "2025"]; // Consider loading tags from the data
    const [selectedYears, setSelectedYears] = useState([]);

    // Filter the data based on the selected tags
    useEffect(() => {
        if (selectedYears.length === 0) {
            setTaggedData(data);
            return;
        }

        const filteredData = data.filter((item) => {
            return item.cohorts.some(cohort => selectedYears.includes(cohort.year) && roles.includes(cohort.role)); 
        });
        setTaggedData(filteredData);
    }, [selectedYears, data, setTaggedData]);

    // Close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            const flyoutElement = document.getElementById('myMultiselect');
            if (flyoutElement && !flyoutElement.contains(event.target) && checkboxesVisible) {
                setCheckboxesVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [checkboxesVisible]);

    const toggleCheckboxArea = () => {
        setCheckboxesVisible(!checkboxesVisible);
    };

    const checkboxStatusChange = (event) => {
        const value = event.target.value;
        setSelectedYears((prevValues) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((v) => v !== value);
            } else {
                return [...prevValues, value].sort();
            }
        });
    };

    return (
        // <div className="container-fluid">
            <div className="form-group">
                <div id="filterTagSelect" className="multiselect">
                    <div className="selectBox" onClick={toggleCheckboxArea}>
                        <select id="selectBoxLabel"className="form-select">
                            <option className="bg-white">{selectedYears.length > 0 ? selectedYears.join(', ') : 'Select Year'}</option>
                        </select>
                        <div className="overSelect"></div>
                    </div>
                    {checkboxesVisible && (
                        <div id="dropDownOptions" className="checkboxes">
                            {tags.map((tag, index) => (
                                <label key={index} htmlFor={tag} className="optionText">
                                    <input
                                        type="checkbox"
                                        id={tag}
                                        onChange={checkboxStatusChange}
                                        value={tag}
                                        checked={selectedYears.includes(tag)}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        // {/* </div> */}
    );
};

export default YearFilter;