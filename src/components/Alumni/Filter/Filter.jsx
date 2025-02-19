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

const Filter = ({selectedTags, setSelectedTags}) => {
    const [checkboxesVisible, setCheckboxesVisible] = useState(false);
    const tags = ['2024', '2025', 'Alumni', 'Officer', 'Member', 'UI/UX'];

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

    // TODO: Do sort for tags array so displays same every time
    const checkboxStatusChange = (event) => {
        const value = event.target.value;
        setSelectedTags((prevValues) => {
            if (prevValues.includes(value)) {
                return prevValues.filter((v) => v !== value);
            } else {
                return [...prevValues, value];
            }
        });
    };

    // TODO: if we want to implement a dropdown filter over tags, need to handle selection logic for starting value of none.
    const dropDownChange = (event) => {
        console.log("need to implement with new single variable react hook");
    };

    return (
        <div className="container-fluid">
            {/* Drop Down Option */}
            <div className="form-group col-sm-8">
                <select id="dur" className="form-select">
                    {tags.map((tag, index) => (
                        <option key={index} value={tag} onChange={dropDownChange}>{tag}</option>
                    ))}
                </select>
            </div>

            {/* Tag Filter Option */}
            <div className="form-group col-sm-8">
                <div id="myMultiselect" className="multiselect">
                    <div id="mySelectLabel" className="selectBox" onClick={toggleCheckboxArea}>
                        <select className="form-select">
                            <option>{selectedTags.length > 0 ? selectedTags.join(', ') : 'Select Tags'}</option>
                        </select>
                        <div className="overSelect"></div>
                    </div>
                    {checkboxesVisible && (
                        <div id="mySelectOptions" className="checkboxes">
                            {tags.map((tag, index) => (
                                <label key={index} htmlFor={tag}>
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

export default Filter;