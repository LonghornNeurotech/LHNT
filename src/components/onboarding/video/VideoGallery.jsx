// Embed display of videos on the website
import { useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from './VideoPlayer';

const VideoGallery = ({ videos, onVideoComplete }) => {
  // const [completedVideos, setCompletedVideos] = useState({}); (for checking Video progress)

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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
      }}
    >
      {videos.map((video, idx) => (
        <div key={idx} style={{ flex: '1 1 320px', maxWidth: 500, minWidth: 280 }}>
          <VideoPlayer
            url={video.url}
            title={video.title}
            duration={video.duration}
            subtitlesSrc={video.subtitlesSrc}
            onComplete={() => handleComplete(idx)}
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
      title: PropTypes.string,
      duration: PropTypes.number,
      subtitlesSrc: PropTypes.string,
    })
  ).isRequired,
  onVideoComplete: PropTypes.func,
};

VideoGallery.defaultProps = {
  onVideoComplete: () => {},
};

export default VideoGallery;