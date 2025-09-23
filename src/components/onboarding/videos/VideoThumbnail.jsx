import { useState } from "react";
import PropTypes from "prop-types";
import CompletionIcon from "../../common/CompletionIcon";

const VideoThumbnail = ({ video, onClick, isWatched = false }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(video);
    }
  };

  return (
    <div className="cursor-pointer group" onClick={handleClick}>
      {/* Video Thumbnail */}
      <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video mb-2">
        {!imageError && video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="text-gray-500 text-4xl">🎬</div>
          </div>
        )}
        
        {/* Play Button Overlay - Only visible on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
          <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            <div className="text-gray-800 text-xl">▶</div>
          </div>
        </div>
      </div>

      {/* Video Title and CompletionIcon (for required videos only) */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900 flex-1 group-hover:text-blue-600 transition-colors duration-200">
          {video.title}
        </h4>
        
        {/* CompletionIcon only for required videos */}
        {video.required && (
          <div className="ml-2 flex-shrink-0">
            <CompletionIcon completed={isWatched} />
          </div>
        )}
      </div>
    </div>
  );
};

VideoThumbnail.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    required: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  isWatched: PropTypes.bool,
};

export default VideoThumbnail;