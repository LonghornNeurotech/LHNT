// Embed display of videos on the website
import { useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';

const VideoGallery = ({ videos, onVideoComplete }) => {
  const [completedVideos, setCompletedVideos] = useState({});

  const handleComplete = (index) => {
    setCompletedVideos((prev) => {
      if (prev[index]) return prev;
      const updated = { ...prev, [index]: true };
      if (Object.keys(updated).length === videos.length && onVideoComplete) {
        onVideoComplete();
      }
      return updated;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video, index) => (
        <div
          key={video.url}
          className={`relative ${
            completedVideos[index] ? 'ring-4 ring-prussian_blue rounded-lg' : ''
          }`}
        >
          <VideoPlayer
            url={video.url}
            title={video.title}
            duration={video.duration}
            subtitlesSrc={video.subtitlesSrc}
            onComplete={() => handleComplete(index)}
          />
        </div>
      ))}
    </div>
  );
};

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      duration: PropTypes.number,
      subtitlesSrc: PropTypes.string,
    })
  ).isRequired,
  onVideoComplete: PropTypes.func,
};

export default VideoGallery;
