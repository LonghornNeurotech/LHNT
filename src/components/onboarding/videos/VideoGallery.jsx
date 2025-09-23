import { useState } from "react";
import PropTypes from "prop-types";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";

const VideoGallery = ({ videos, onVideoWatch, watchedVideos = new Set() }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    // Mark video as watched when clicked
    if (onVideoWatch) {
      onVideoWatch(video.title, video.required);
    }
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <VideoThumbnail
            key={index}
            video={video}
            onClick={() => handleVideoClick(video)}
            isWatched={watchedVideos.has(video.title)}
          />
        ))}
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ).isRequired,
  onVideoWatch: PropTypes.func,
  watchedVideos: PropTypes.instanceOf(Set),
};

export default VideoGallery;