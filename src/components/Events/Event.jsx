// Event component for the Events page
import PropTypes from 'prop-types';
import {PRUSSIAN_BLUE, VANILLA, BONE_WHITE} from './colors.js';
import ImageCarousel from './ImageCarousel';

/* 
    Takes in all properties of event and returns 
    a newly generated event with these properties
    to add onto the Events page for display. 
*/
const Event = ({ event }) => {

    console.log(`Event received in Event component:`, event);

    const { name, date, location, details, type, images } = event;

    return (
        <div style={{backgroundColor: BONE_WHITE}} className="flex flex-col h-full rounded-lg shadow-md overflow-hidden">
            {/* Event Type Banner */}
            <div className="w-full">
                <span 
                    style={{
                        backgroundColor: VANILLA, 
                        fontFamily: 'Antonio', 
                        letterSpacing: "0.05em", 
                        display: 'block'
                    }} 
                    className="w-full inline-block py-2 pl-4 text-base md:text-lg font-semibold"
                >
                    {type}
                </span>
            </div>

            {/* Image Carousel */}
            <ImageCarousel images={images} />

            {/* Event Content */}
            <div className="flex flex-col flex-grow p-4" style={{ fontFamily: 'Antonio' }}>
                {/* Event Title */}
                <h3 style={{color: PRUSSIAN_BLUE, fontFamily: 'Antonio'}} 
                    className="text-xl font-bold mb-3">
                    {name}
                </h3>
                
                {/* Event Description */}
                <div className="flex-grow mb-4">
                    <p className="text-base normal baseText">
                        {details}
                    </p>
                </div>
                
                {/* Event Details Footer */}
                <div className="mt-auto">
                    <p className="text-lg baseText">
                        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
                    </p>
                    {location && 
                        <p className="text-lg baseText">
                            <strong>Location:</strong> {location}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        name: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        location: PropTypes.string,
        details: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default Event;
