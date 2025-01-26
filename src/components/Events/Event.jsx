// Event component for the Events page
import PropTypes from 'prop-types';
import {PRUSSIAN_BLUE, VANILLA, BONE_WHITE} from './colors.js';

/* 
    Takes in all properties of event and returns 
    a newly generated event with these properties
    to add onto the Events page for display. 
*/
const Event = ({ event }) => {

    console.log(`Event received in Event component:`, event);

    const { name, date, location, details, type, image } = event;

    // Provide a placeholder image if the event provided doesn't have an image URL.
    const placeholderImage = "https://via.placeholder.com/150";

    return (
        <div style={{backgroundColor: BONE_WHITE}} className="flex flex-col h-full rounded-lg shadow-md overflow-hidden">
            {/* Event Type Banner */}
            <div className="w-full">
                <span style={{backgroundColor: VANILLA, fontFamily: 'Antonio', letterSpacing: "0.05em"}} 
                      className="w-full inline-block py-2 text-center text-base md:text-lg font-semibold">
                    {type}
                </span>
            </div>
            
            {/* Event Image */}
            <div className="relative w-full overflow-hidden flex items-center justify-center" 
                style={{ 
                    minHeight: '300px',
                    height: 'auto',
                    maxHeight: '350px',
                    '@media (max-width: 768px)': {
                        minHeight: '500px',  // Increased minimum height for mobile
                        maxHeight: '600px'   // Increased maximum height for mobile
                    }
                }}>
                <img 
                    src={image || placeholderImage} 
                    alt={name} 
                    className="h-full w-auto md:w-auto max-w-full"
                    style={{
                        backgroundColor: BONE_WHITE,
                        padding: '4px',      // Reduced padding
                        objectFit: 'contain',
                        '@media (max-width: 768px)': {
                            objectFit: 'contain',
                            height: '100%',  // Fill container height
                            width: 'auto',   // Maintain aspect ratio
                            maxWidth: '98%', // Nearly full width
                            minHeight: '480px' // Ensure minimum height for portrait images
                        }
                    }}
                />
            </div>


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
        image: PropTypes.string,
    }).isRequired,
};

export default Event;
