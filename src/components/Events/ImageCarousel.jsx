// ImageCarousel component for when an event has at least 2 images to display
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BONE_WHITE } from './colors.js';

const ImageCarousel = ({ images }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Checks if there are no images to display
    if (!images || images.length === 0) {
        return null;
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // If only one image, render without carousel controls
    if (images.length === 1) {
        return (
            <div 
                className="relative w-full overflow-hidden flex items-center justify-center" 
                style={{ 
                    minHeight: '300px',
                    height: 'auto',
                    maxHeight: '350px',
                    '@media (max-width: 768px)': {
                        minHeight: '500px',
                        maxHeight: '600px'
                    }
                }}
            >
                <img 
                    src={images[0]} 
                    alt="Event"
                    className="h-full w-auto md:w-auto max-w-full"
                    style={{
                        backgroundColor: BONE_WHITE,
                        padding: '4px',
                        objectFit: 'contain',
                        '@media (max-width: 768px)': {
                            objectFit: 'contain',
                            height: '100%',
                            width: 'auto',
                            maxWidth: '98%',
                            minHeight: '480px'
                        }
                    }}
                />
            </div>
        );
    }

    // Render carousel with controls for multiple images
    return (
        <div className="relative w-full overflow-hidden" 
            style={{ 
                minHeight: '450px',
                height: 'auto',
                maxHeight: '600px',
                '@media (min-width: 768px) and (max-width: 1024px)': {
                    minHeight: '500px',
                    maxHeight: '650px'
                },
                '@media (max-width: 768px)': {
                    minHeight: '400px',
                    maxHeight: '500px'
                }
            }}>
            {/* Image Container */}
            <div className="flex items-center justify-center w-full h-full px-8">
                <img 
                    src={images[currentIndex]} 
                    alt={`Event ${currentIndex + 1}`}
                    className="object-contain w-full h-full"
                    style={{
                        backgroundColor: BONE_WHITE,
                        padding: '4px',
                        maxWidth: '100%',
                        maxHeight: '95%',
                        '@media (min-width: 768px) and (max-width: 1024px)': {
                            maxWidth: '95%',
                            minHeight: '450px'
                        }
                    }}
                />
            </div>

            {/* Navigation Buttons */}
            <button 
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full 
                    hover:opacity-80 transition-all flex items-center justify-center"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    width: '40px',
                    height: '40px',
                    zIndex: 10
                }}
                aria-label="Previous image"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M15 19l-7-7 7-7" stroke="#FFF" strokeWidth="2" strokeLinecap="round" 
                        strokeLinejoin="round"/>
                </svg>
            </button>

            <button 
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full 
                    hover:opacity-80 transition-all flex items-center justify-center"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    width: '40px',
                    height: '40px',
                    zIndex: 10
                }}
                aria-label="Next image"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9 5l7 7-7 7" stroke="#FFF" strokeWidth="2" strokeLinecap="round" 
                        strokeLinejoin="round"/>
                </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white 
                px-2 py-1 rounded-full text-sm"
            >
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );

};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;
