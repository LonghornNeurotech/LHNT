import { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";

const VideoGallery = ({ videos, onVideoWatch, watchedVideos = new Set() }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [restrictedVideos, setRestrictedVideos] = useState(new Set());
  const RESTRICTED_STORAGE_KEY = "restrictedVideoUrls";
  const lastOpenRef = useRef(new Map()); // url -> timestamp ms

  // Persist restricted videos so "redirect-on-click" keeps working even after leaving the site.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RESTRICTED_STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) setRestrictedVideos(new Set(arr));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rememberRestricted = useCallback(
    (url) => {
      if (!url) return;
      setRestrictedVideos((prev) => {
        const next = new Set(prev);
        next.add(url);
        try {
          sessionStorage.setItem(RESTRICTED_STORAGE_KEY, JSON.stringify([...next]));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [RESTRICTED_STORAGE_KEY]
  );

  // Enhanced video ID extraction
  const extractVideoId = useCallback((url) => {
    try {
      if (url.includes('youtube.com/embed/')) {
        return url.split('/embed/')[1].split('?')[0];
      }
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
      }
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split('?')[0];
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Create proper YouTube URL from any format
  const getCorrectYouTubeUrl = useCallback((url) => {
    const videoId = extractVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return url; // fallback to original
  }, [extractVideoId]);

  const handleVideoClick = async (video) => {
    // Check if we already know this video is restricted
    if (restrictedVideos.has(video.url)) {
      handleRestrictedVideo(video);
      return;
    }

    // Video seems accessible, open in modal
    setSelectedVideo(video);
    
    // Mark video as watched when clicked
    if (onVideoWatch) {
      onVideoWatch(video.title, video.required);
    }
  };

  const handleRestrictedVideo = (video) => {
    // Guard against multiple error signals causing multiple new tabs.
    const now = Date.now();
    const last = lastOpenRef.current.get(video.url) || 0;
    if (now - last < 1500) return;
    lastOpenRef.current.set(video.url, now);

    // Mark video as watched even if going directly to YouTube
    if (onVideoWatch) {
      onVideoWatch(video.title, video.required);
    }
    
    // Open directly in YouTube with corrected URL
    const directUrl = getCorrectYouTubeUrl(video.url);
    // Per request: open ONLY in a new tab (do not navigate away in the current tab).
    window.open(directUrl, "_blank", "noopener,noreferrer");
  };

  const handleEmbedError = (video) => {
    // Remember this video is restricted for future clicks
    rememberRestricted(video.url);
    
    // Close modal and open in YouTube immediately
    setSelectedVideo(null);
    setTimeout(() => {
      handleRestrictedVideo(video);
    }, 100);
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
            key={`${video.title}-${index}`}
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
          onEmbedError={handleEmbedError}
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