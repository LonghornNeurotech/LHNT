import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import CompletionIcon from "../../common/CompletionIcon";

const getThumbnailUrls = (videoId) => [
  `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
];

const checkIfImageIsBlack = (url, onResult) => {
  const img = new window.Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    // Only check the center, not the border
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(
      canvas.width / 2 - 10, canvas.height / 2 - 10,
      20, 20
    );
    // Sum all pixels; if they're all 0 (black), the image is black
    const isAllBlack = Array.from(data).every(v => v === 0 || v === 255);
    onResult(!isAllBlack, url); // true means "usable"
  };
  img.onerror = () => onResult(false, url);
  img.src = url;
};

const VideoThumbnail = ({ video, onClick, isWatched = false }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const extractVideoId = useCallback((url) => {
    try {
      let videoId = null;
      if (url.includes('youtube.com/embed/')) {
        videoId = url.split('/embed/')[1].split(/[?&]/)[0];
      } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        videoId = urlParams.get('v');
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
      }
      return videoId;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setShowFallback(false);
    const videoId = extractVideoId(video.url);
    if (!videoId) {
      setShowFallback(true);
      setIsLoading(false);
      return;
    }
    const urls = getThumbnailUrls(videoId);

    // Try both possible thumbnails in order, but only render a usable one
    checkIfImageIsBlack(urls[0], (usable, url) => {
      if (usable) {
        setThumbnailUrl(url);
        setShowFallback(false);
        setIsLoading(false);
      } else {
        // Try the next one
        checkIfImageIsBlack(urls[1], (usable2, url2) => {
          if (usable2) {
            setThumbnailUrl(url2);
            setShowFallback(false);
          } else {
            setShowFallback(true);
            setThumbnailUrl(null);
          }
          setIsLoading(false);
        });
      }
    });
  }, [video.url, extractVideoId]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick(video);
  };

  return (
    <div className="group">
      <div
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video mb-3 cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
        onClick={handleClick}
      >
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500 text-sm">Loading video...</div>
          </div>
        ) : !showFallback && thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={`${video.title} thumbnail`}
              className="w-full h-full object-cover block"
              loading="lazy"
              style={{ display: 'block', borderRadius: '0.375rem' }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black bg-opacity-70 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg
                  className="w-6 h-6 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div
            className="w-full h-full bg-gray-300 flex items-center justify-center"
            style={{ borderRadius: '0.375rem' }}
          >
            <div className="text-center">
              <div className="text-4xl text-gray-500 mb-2">🎥</div>
              <div className="text-gray-600 text-sm font-medium">Video Preview</div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black bg-opacity-70 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg
                  className="w-6 h-6 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between">
        <h4 className="text-sm font-medium text-gray-900 flex-1 line-clamp-2 pr-2">
          {video.title}
        </h4>
        {video.required && (
          <div className="flex-shrink-0">
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
    url: PropTypes.string.isRequired,
    required: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  isWatched: PropTypes.bool,
};

export default VideoThumbnail;