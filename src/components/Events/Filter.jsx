// Filter component for the Events page
import PropTypes from 'prop-types';
import {BONE_WHITE} from './colors.js';

/*
    Creates a new Filter button to display on the Events
    page where the user can choose a specfic criteria
    and helps automatically updates the Events page
    to display all the events that match that criteria!
*/
const Filter = ({ setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="filter-section">
      <select 
        style={{backgroundColor: BONE_WHITE, height: "2.5em"}}
        onChange={handleFilterChange}
        className="form-select baseText text-2xl"
      >
        <option value="all">All Events</option>
        <option value="past">Past Events</option>
        <option value="upcoming">Upcoming Events</option>
        <option value="project">Project Meetings</option>
        <option value="general">General Meetings</option>
        <option value="guest">Guest Speaker Talks</option>
        <option value="social">Social Events</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default Filter;