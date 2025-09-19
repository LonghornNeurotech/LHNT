import { useState } from "react";
import PropTypes from "prop-types";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";

const VideoGallery = function ({ videos }) {
  const [selectedVideoIdx, setSelectedVideoIdx] = useState(null);

  // Extract YouTube video ID and generate thumbnail URL
  const getYouTubeThumbnailUrl = (url) => {
    const match = url.match(/youtube\.com\/embed\/([^/?]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
  };

  const openVideo = (idx) => setSelectedVideoIdx(idx);
  const closeVideo = () => setSelectedVideoIdx(null);

  if (!videos || videos.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap">
        {videos.map((video, idx) => (
          <VideoThumbnail
            key={video.url}
            thumbnailUrl={getYouTubeThumbnailUrl(video.url)}
            title={video.title}
            required={!!video.required}
            onClick={() => openVideo(idx)}
          />
        ))}
      </div>
      {selectedVideoIdx !== null && (
        <VideoModal
          open={true}
          url={videos[selectedVideoIdx].url}
          title={videos[selectedVideoIdx].title}
          onClose={closeVideo}
        />
      )}
    </>
  );
};

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ).isRequired,
};

export default VideoGallery;