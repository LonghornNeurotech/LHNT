// Event component for the Events page
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {PRUSSIAN_BLUE, VANILLA, BONE_WHITE} from './colors.js';
import ImageCarousel from './ImageCarousel';

/* 
    Takes in all properties of event and returns 
    a newly generated event with these properties
    to add onto the Events page for display. 
*/
const Event = ({ event }) => {

    const [showFiles, setShowFiles] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null); 

    console.log(`Event received in Event component:`, event);

    const { name, date, location, details, type, images } = event;

    // Handles clicking outside of dropdown
    useEffect( () => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && buttonRef.current 
                    && !buttonRef.current.contains(e.target)
                    && !dropdownRef.current.contains(e.target)
            ){
                setShowFiles(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown',
            handleClickOutside);
    }, []);

    return (
        <div 
            style={{backgroundColor: BONE_WHITE}} 
            className="flex flex-col h-full rounded-lg shadow-md overflow-hidden"
        >

            {/* Top Section with Type Banner and File Icon */}
            <div className="relative w-full">
                {/* Event Type Banner */}
                <span 
                    style={{
                        backgroundColor: VANILLA, 
                        fontFamily: 'Antonio',
                        letterSpacing: "0.05em"
                    }}
                    className="inline-block py-2 px-4 text-base md:text-lg font-semibold rounded-br-lg"
                >
                    {type}
                </span>

                {/* File Icon (if files exist) */}
                {event.files && event.files.length > 0 && (
                    <div className="absolute top-0 right-0">
                        <button 
                            ref={buttonRef}
                            onClick={() => setShowFiles(!showFiles)}
                            className="p-2 m-1 rounded-full hover:bg-opacity-90 transition-all"
                            style={{backgroundColor: PRUSSIAN_BLUE}}
                        >
                            <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke={BONE_WHITE}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <line x1="10" y1="9" x2="8" y2="9" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showFiles && (
                            <div 
                                ref={dropdownRef} 
                                className={`absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg z-20 overflow-hidden
                                    transition-all duration-200 ease-in-out origin-top ${showFiles ? 'opacity-100 scale-y-100'
                                    : 'opacity-0 scale-y-0 pointer-events-none'} `}
                            >
                                {event.files.map((file, index) => (
                                    <a 
                                        key={index}
                                        href={file.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 p-3 hover:bg-gray-100 transition-colors"
                                        style={{ color: PRUSSIAN_BLUE }}
                                    >
                                        {/* PDF Icon */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill={PRUSSIAN_BLUE}>
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                                            <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" fill="none" stroke="white" strokeWidth="2"/>
                                        </svg>
                                        <span className="font-medium">{file.name}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}


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
        files: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        }))
    }).isRequired,
};

export default Event;
