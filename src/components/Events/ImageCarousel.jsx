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
            <div className="relative w-full overflow-hidden flex items-center justify-center" 
                style={{ 
                    minHeight: '300px',
                    height: 'auto',
                    maxHeight: '350px',
                    '@media (max-width: 768px)': {
                        minHeight: '500px',
                        maxHeight: '600px'
                    }
                }}>
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
                minHeight: '300px',
                height: 'auto',
                maxHeight: '350px',
                '@media (max-width: 768px)': {
                    minHeight: '500px',
                    maxHeight: '600px'
                }
            }}>
            {/* Image Container */}
            <div className="flex items-center justify-center">
                <img 
                    src={images[currentIndex]} 
                    alt={`Event ${currentIndex + 1}`}
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

            {/* Navigation Buttons */}
            <button 
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                aria-label="Previous image"
            >
                ←
            </button>
            <button 
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                aria-label="Next image"
            >
                →
            </button>

            {/* Optional: Image Counter */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;
