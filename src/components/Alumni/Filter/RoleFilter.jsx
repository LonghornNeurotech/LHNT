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

const RoleFilter = ({setTaggedData, data, setRoles, roles}) => {
    const [checkboxesVisible, setCheckboxesVisible] = useState(false);
    const tags = ['President', 'Captain', 'R&D Lead', 'Hardware Lead', 'Software Lead',
    'VP of Membership', 'VP of Outreach', 'VP of Finance',
    'VP of Marketing', 'VP of Operations', 'VP of Competition',
    ]; // Consider loading tags from the data

    // Filter the data based on the selected tags
    useEffect(() => {
        if (roles.length === 0) {
            setTaggedData(data);
            return;
        }

        const filteredData = data.filter((item) => {
            return item.cohorts.some(cohort => roles.includes(cohort.role));
        });
        setTaggedData(filteredData);
    }, [roles, data, setTaggedData]);

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
        setRoles((prevValues) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((v) => v !== value);
            } else {
                return [...prevValues, value].sort();
            }
        });
    };

    return (
            <div className="form-group">
                <div id="filterTagSelect" className="multiselect">
                    <div className="selectBox" onClick={toggleCheckboxArea}>
                        <select id="selectBoxLabel"className="form-select">
                            <option className="bg-white">{roles.length > 0 ? roles.join(', ') : 'Select Roles'}</option>
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
                                        checked={roles.includes(tag)}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
    );
};

export default RoleFilter;