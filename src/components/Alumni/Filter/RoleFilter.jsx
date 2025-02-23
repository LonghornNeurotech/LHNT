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

const RoleFilter = ({setTaggedData, data}) => {
    const [checkboxesVisible, setCheckboxesVisible] = useState(false);
    const tags = ['President', 'VP Membership', 'VP Outreach', 'VP Finance', 'VP Marketing', 'VP Operations', 'VP Competition',
    'ML', 'UI/UX', 'Signal Acquisition']; // Consider loading tags from the data
    const [selectedTags, setSelectedTags] = useState([]);

    // Filter the data based on the selected tags
    useEffect(() => {
        if (selectedTags.length === 0) {
            setTaggedData(data);
            return;
        }

        const filteredData = data.filter((item) => {
            // return selectedTags.any((tag) => item.tags.includes(tag));
            return item.cohorts.some(cohort => selectedTags.includes(cohort.role));
        });
        setTaggedData(filteredData);
    }, [selectedTags, data, setTaggedData]);

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
        setSelectedTags((prevValues) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((v) => v !== value);
            } else {
                return [...prevValues, value].sort();
            }
        });
    };

    return (
        <div className="container-fluid">
            {/* Tag Filter Option */}
            <div className="form-group">
                <div id="filterTagSelect" className="multiselect">
                    <div className="selectBox" onClick={toggleCheckboxArea}>
                        <select id="selectBoxLabel"className="form-select">
                            <option className="bg-white">{selectedTags.length > 0 ? selectedTags.join(', ') : 'Select Roles'}</option>
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
                                        checked={selectedTags.includes(tag)}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleFilter;