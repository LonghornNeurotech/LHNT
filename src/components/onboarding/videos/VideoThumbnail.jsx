/*
  Developer's Notes:
  Once progress tracking is fully implemented and saved for each member,
  then include the CompletionIcon component. For now, omit the CompletionIcon 
  component and any semblance of progress indicators from the user until 
  progress tracking is fully implemented and saved for each member.
*/
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
// import CompletionIcon from "../../common/CompletionIcon";

const getThumbnailUrls = (id) => [
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`
];

const checkImage = (url, cb) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => cb(true, url);
  img.onerror = () => cb(false, url);
  img.src = url;
};

const VideoThumbnail = ({ video, onClick, isWatched }) => {
  const [thumbUrl, setThumbUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const extractVideoId = useCallback((url) => {
    try {
      if (url.includes("embed/")) return url.split("embed/")[1].split(/[?&]/)[0];
      if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split(/[?&]/)[0];
      if (url.includes("watch")) return new URL(url).searchParams.get("v");
    } catch {
      // invalid URL
    }
    return null;
  }, []);

  useEffect(() => {
    setLoading(true);

    // If a custom thumbnail is provided, use it directly
    if (video.thumbnail) {
      setThumbUrl(video.thumbnail);
      setLoading(false);
      return;
    }

    // Otherwise, fallback to YouTube thumbnail lookup
    const id = extractVideoId(video.url);
    if (!id) {
      setThumbUrl(null);
      setLoading(false);
      return;
    }

    const [first, second, third] = getThumbnailUrls(id);
    checkImage(first, (ok, url) => {
      if (ok) {
        setThumbUrl(url);
        setLoading(false);
      } else {
        checkImage(second, (ok2, url2) => {
          if (ok2) {
            setThumbUrl(url2);
          } else {
            setThumbUrl(third);
          }
          setLoading(false);
        });
      }
    });
  }, [video, extractVideoId]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(video);
  };

  return (
    <div className="group">
      <div
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video mb-3 cursor-pointer transition-transform group-hover:scale-105"
        onClick={handleClick}
      >
        {loading ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Loading...</span>
          </div>
        ) : thumbUrl ? (
          <img src={thumbUrl} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">📹</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-2">
        <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
        {/* {video.required && <CompletionIcon completed={isWatched} />} */}
      </div>
    </div>
  );
};

VideoThumbnail.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    required: PropTypes.bool,
    thumbnail: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isWatched: PropTypes.bool,
};

export default VideoThumbnail;