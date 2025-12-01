import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import YouTubeEmbed from "./YouTubeEmbed";

const VideoModal = ({ video, isOpen, onClose, onEmbedError }) => {
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Reset error state when modal opens
      setHasError(false);
    }
  }, [isOpen, video]);

  if (!isOpen || !video) return null;

  const handlePlayerError = () => {
    setHasError(true);
    if (onEmbedError) {
      onEmbedError(video);
    }
  };

  const handleYouTubeError = (code) => {
    // For YouTube, 101/150 are the classic "embedding disabled" errors.
    // Treat ANY error code as a reason to fall back to opening the original platform.
    if (code != null) {
      handlePlayerError();
    } else {
      // If we couldn't even parse/init the player, also fall back.
      handlePlayerError();
    }
  };

  const getDirectVideoUrl = (embedUrl) => {
    try {
      if (embedUrl.includes('youtube.com/embed/')) {
        const videoId = embedUrl.split('/embed/')[1].split('?')[0];
        return `https://www.youtube.com/watch?v=${videoId}`;
      }
      if (embedUrl.includes('youtu.be/')) {
        const videoId = embedUrl.split('youtu.be/')[1].split(/[?&]/)[0];
        return `https://www.youtube.com/watch?v=${videoId}`;
      }
      if (embedUrl.includes('youtube.com/watch')) {
        const videoId = new URL(embedUrl).searchParams.get('v');
        return videoId ? `https://www.youtube.com/watch?v=${videoId}` : embedUrl;
      }
      return embedUrl;
    } catch {
      // Removed unused error variable
      return embedUrl;
    }
  };

  const openVideoDirectly = () => {
    const directUrl = getDirectVideoUrl(video.url);
    // Open ONLY in a new tab (do not navigate away in the current tab).
    window.open(directUrl, "_blank", "noopener,noreferrer");
  };

  const playerUrl = getDirectVideoUrl(video.url);
  const isYouTube = /youtube\.com|youtu\.be/.test(String(video.url));

  // Responsive sizing - PERFECT mobile layout
  const modalClasses = isMobile 
    ? "bg-white rounded-t-lg w-full h-full max-w-none max-h-none overflow-y-auto flex flex-col p-3" // Minimal padding for mobile
    : "bg-white rounded-lg p-8 w-[90vw] h-[90vh] max-w-none max-h-none overflow-y-auto flex flex-col";
    
  const videoHeight = isMobile ? "65vh" : "70vh"; // Better mobile height
  const headerTextSize = isMobile ? "text-lg" : "text-2xl";
  const closeButtonSize = isMobile ? "text-2xl" : "text-3xl";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      style={{ padding: isMobile ? '0' : '16px' }} // No padding on mobile
      onClick={onClose}
    >
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {/* Header - Compact on mobile */}
        <div className={`flex justify-between items-center flex-shrink-0 ${isMobile ? 'mb-2' : 'mb-4'}`}>
          <h2 className={`${headerTextSize} font-semibold pr-4 line-clamp-2 flex-1`}>
            {video.title}
          </h2>
          <button 
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 ${closeButtonSize} font-bold leading-none flex-shrink-0 w-8 h-8 flex items-center justify-center`}
          >
            ×
          </button>
        </div>

        {/* Video Player Container - Perfect sizing */}
        <div 
          className="relative bg-black rounded-lg overflow-hidden flex-shrink-0 w-full" 
          style={{ height: videoHeight }}
        >
          {!hasError ? (
            isYouTube ? (
              <YouTubeEmbed
                url={video.url}
                title={video.title}
                autoplay={true}
                onError={handleYouTubeError}
              />
            ) : (
              <ReactPlayer
                url={playerUrl}
                width="100%"
                height="100%"
                playing
                controls
                onError={handlePlayerError}
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white">
              <div className="text-center mb-6 px-4">
                <div className="text-4xl md:text-6xl mb-4">⚠️</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Video unavailable</h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  Playback on other websites has been disabled by the video owner
                </p>
                <button
                  onClick={openVideoDirectly}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-lg transition-colors duration-200"
                >
                  Watch on YouTube
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Description - Only show if exists, compact on mobile */}
        {video.description && (
          <div className={`flex-shrink-0 ${isMobile ? 'mt-2' : 'mt-4'}`}>
            <h3 className="text-base md:text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {video.description}
            </p>
          </div>
        )}

        {/* Alternative link for embed errors - Compact */}
        {hasError && (
          <div className={`p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex-shrink-0 ${isMobile ? 'mt-2' : 'mt-4'}`}>
            <p className="text-yellow-800 text-xs md:text-sm">
              Having trouble viewing the video? 
              <button
                onClick={openVideoDirectly}
                className="ml-2 text-blue-600 hover:text-blue-800 underline font-semibold"
              >
                Click here to open in YouTube
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

VideoModal.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEmbedError: PropTypes.func,
};

export default VideoModal;