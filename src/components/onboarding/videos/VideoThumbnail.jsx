// Previous Working A: Successful tracking of required video watching progress in a task, but can't check the video iframe and take user to watch video directly on YouTube instead of in the VideoModal component.
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import CompletionIcon from "../../common/CompletionIcon";

const getThumbnailUrls = (id) => [
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
    const id = extractVideoId(video.url);
    if (!id) {
      setThumbUrl(null);
      setLoading(false);
      return;
    }
    const [high, med] = getThumbnailUrls(id);
    checkImage(high, (ok, url) => {
      if (ok) {
        setThumbUrl(url);
      } else {
        checkImage(med, (_, url2) => setThumbUrl(url2));
      }
      setLoading(false);
    });
  }, [video.url, extractVideoId]);

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
        {video.required && <CompletionIcon completed={isWatched} />}
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
  onClick: PropTypes.func.isRequired,
  isWatched: PropTypes.bool,
};

export default VideoThumbnail;

// Previous Working Approach B: Video thumbnails all display but confusing logic and no CompletionIcon component
// import PropTypes from "prop-types";

// const VideoThumbnail = ({ video, onClick }) => {
//   const extractVideoId = (url) => {
//     try {
//       if (url.includes("youtube.com/embed/")) {
//         return url.split("/embed/")[1].split(/[?&]/)[0];
//       }
//       if (url.includes("watch")) {
//         return new URL(url).searchParams.get("v");
//       }
//       if (url.includes("youtu.be/")) {
//         return url.split("youtu.be/")[1].split(/[?&]/)[0];
//       }
//       return null;
//     } catch {
//       return null;
//     }
//   };

//   const videoId = extractVideoId(video.url);
//   const thumbnailUrl = videoId 
//     ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//     : null;

//   return (
//     <div 
//       className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//       onClick={onClick}
//     >
//       {thumbnailUrl ? (
//         <div className="relative aspect-video">
//           <img
//             src={thumbnailUrl}
//             alt={video.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//             <div className="bg-red-600 rounded-full p-3">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M8 5v14l11-7z" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="aspect-video bg-gray-300 flex items-center justify-center">
//           <div className="text-gray-500 text-center">
//             <div className="text-2xl mb-2">📹</div>
//             <p>Video Preview</p>
//           </div>
//         </div>
//       )}
//       {video.title && (
//         <div className="p-3">
//           <h3 className="font-medium text-sm line-clamp-2">
//             {video.title}
//           </h3>
//         </div>
//       )}
//     </div>
//   );
// };

// VideoThumbnail.propTypes = {
//   video: PropTypes.shape({
//     title: PropTypes.string,
//     url: PropTypes.string.isRequired,
//   }).isRequired,
//   onClick: PropTypes.func.isRequired,
// };

// export default VideoThumbnail;

// Previous Working Approach
// import { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import CompletionIcon from "../../common/CompletionIcon";

// const getThumbnailUrls = (videoId) => [
//   `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
//   `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
// ];

// const checkIfImageIsBlack = (url, onResult) => {
//   const img = new window.Image();
//   img.crossOrigin = "Anonymous";
//   img.onload = () => {
//     // Only check the center, not the border
//     const canvas = document.createElement("canvas");
//     canvas.width = img.naturalWidth;
//     canvas.height = img.naturalHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//     const { data } = ctx.getImageData(
//       canvas.width / 2 - 10, canvas.height / 2 - 10,
//       20, 20
//     );
//     // Sum all pixels; if they're all 0 (black), the image is black
//     const isAllBlack = Array.from(data).every(v => v === 0 || v === 255);
//     onResult(!isAllBlack, url); // true means "usable"
//   };
//   img.onerror = () => onResult(false, url);
//   img.src = url;
// };

// const VideoThumbnail = ({ video, onClick, isWatched = false }) => {
//   const [thumbnailUrl, setThumbnailUrl] = useState(null);
//   const [showFallback, setShowFallback] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const extractVideoId = useCallback((url) => {
//     try {
//       let videoId = null;
//       if (url.includes('youtube.com/embed/')) {
//         videoId = url.split('/embed/')[1].split(/[?&]/)[0];
//       } else if (url.includes('youtube.com/watch')) {
//         const urlParams = new URLSearchParams(url.split('?')[1]);
//         videoId = urlParams.get('v');
//       } else if (url.includes('youtu.be/')) {
//         videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
//       }
//       return videoId;
//     } catch {
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     setIsLoading(true);
//     setShowFallback(false);
//     const videoId = extractVideoId(video.url);
//     if (!videoId) {
//       setShowFallback(true);
//       setIsLoading(false);
//       return;
//     }
//     const urls = getThumbnailUrls(videoId);

//     // Try both possible thumbnails in order, but only render a usable one
//     checkIfImageIsBlack(urls[0], (usable, url) => {
//       if (usable) {
//         setThumbnailUrl(url);
//         setShowFallback(false);
//         setIsLoading(false);
//       } else {
//         // Try the next one
//         checkIfImageIsBlack(urls[1], (usable2, url2) => {
//           if (usable2) {
//             setThumbnailUrl(url2);
//             setShowFallback(false);
//           } else {
//             setShowFallback(true);
//             setThumbnailUrl(null);
//           }
//           setIsLoading(false);
//         });
//       }
//     });
//   }, [video.url, extractVideoId]);

//   const handleClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (onClick) onClick(video);
//   };

//   return (
//     <div className="group">
//       <div
//         className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video mb-3 cursor-pointer transition-transform duration-200 group-hover:scale-[1.02]"
//         onClick={handleClick}
//       >
//         {isLoading ? (
//           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//             <div className="text-gray-500 text-sm">Loading video...</div>
//           </div>
//         ) : !showFallback && thumbnailUrl ? (
//           <>
//             <img
//               src={thumbnailUrl}
//               alt={`${video.title} thumbnail`}
//               className="w-full h-full object-cover block"
//               loading="lazy"
//               style={{ display: 'block', borderRadius: '0.375rem' }}
//             />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="bg-black bg-opacity-70 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                 <svg
//                   className="w-6 h-6 text-white ml-0.5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div
//             className="w-full h-full bg-gray-300 flex items-center justify-center"
//             style={{ borderRadius: '0.375rem' }}
//           >
//             <div className="text-center">
//               <div className="text-4xl text-gray-500 mb-2">🎥</div>
//               <div className="text-gray-600 text-sm font-medium">Video Preview</div>
//             </div>
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 pointer-events-none" />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="bg-black bg-opacity-70 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                 <svg
//                   className="w-6 h-6 text-white ml-0.5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex items-start justify-between">
//         <h4 className="text-sm font-medium text-gray-900 flex-1 line-clamp-2 pr-2">
//           {video.title}
//         </h4>
//         {video.required && (
//           <div className="flex-shrink-0">
//             <CompletionIcon completed={isWatched} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// VideoThumbnail.propTypes = {
//   video: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     required: PropTypes.bool,
//   }).isRequired,
//   onClick: PropTypes.func,
//   isWatched: PropTypes.bool,
// };

// export default VideoThumbnail;