import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import VideoThumbnail from "./VideoThumbnail";
import VideoModal from "./VideoModal";

const VideoGallery = ({ videos, onVideoWatch, watchedVideos = new Set() }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [restrictedVideos, setRestrictedVideos] = useState(new Set());

  // Enhanced video ID extraction (same as VideoThumbnail)
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

  // Check if a video is likely to be restricted
  const checkIfVideoRestricted = async (video) => {
    try {
      const videoId = extractVideoId(video.url);
      if (!videoId) return true; // Invalid URL = restricted
      
      // Test thumbnail accessibility
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log('Video thumbnail accessible:', video.title);
          resolve(false);
        };
        img.onerror = () => {
          console.log('Video thumbnail not accessible:', video.title);
          resolve(true);
        };
        img.src = thumbnailUrl;
        
        // Timeout after 3 seconds
        setTimeout(() => {
          console.log('Thumbnail check timeout for:', video.title);
          resolve(true);
        }, 3000);
      });
    } catch {
      return true; // Error = restricted
    }
  };

  const handleVideoClick = async (video) => {
    console.log('Video clicked:', video.title, 'URL:', video.url);
    
    // Check if we already know this video is restricted
    if (restrictedVideos.has(video.title)) {
      console.log('Video already known to be restricted:', video.title);
      handleRestrictedVideo(video);
      return;
    }
    
    // Quick check for restriction patterns
    const isRestricted = await checkIfVideoRestricted(video);
    if (isRestricted) {
      console.log('Video detected as restricted:', video.title);
      setRestrictedVideos(prev => new Set(prev).add(video.title));
      handleRestrictedVideo(video);
      return;
    }

    // Video seems accessible, open in modal
    console.log('Opening video in modal:', video.title);
    setSelectedVideo(video);
    
    // Mark video as watched when clicked
    if (onVideoWatch) {
      onVideoWatch(video.title, video.required);
    }
  };

  const handleRestrictedVideo = (video) => {
    console.log('Redirecting to YouTube for restricted video:', video.title);
    
    // Mark video as watched even if going directly to YouTube
    if (onVideoWatch) {
      onVideoWatch(video.title, video.required);
    }
    
    // Open directly in YouTube with corrected URL
    const directUrl = getCorrectYouTubeUrl(video.url);
    console.log('Opening YouTube URL:', directUrl);
    window.open(directUrl, '_blank');
  };

  const handleEmbedError = (video) => {
    console.log('Embed error for video:', video.title);
    
    // Remember this video is restricted for future clicks
    setRestrictedVideos(prev => new Set(prev).add(video.title));
    
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

// Previous approach B: Video thumbnail displayed correctly, but confusing logic
// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import VideoThumbnail from "./VideoThumbnail";
// import VideoModal from "./VideoModal";

// const VideoGallery = ({ videos }) => {
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [videoEmbedStatus, setVideoEmbedStatus] = useState({});

//   // Check if videos can be embedded when component mounts
//   useEffect(() => {
//     const checkVideoEmbeds = async () => {
//       const status = {};
      
//       for (const video of videos) {
//         if (video.url) {
//           const canEmbed = await testVideoEmbed(video.url);
//           status[video.url] = canEmbed;
//         }
//       }
      
//       setVideoEmbedStatus(status);
//     };

//     if (videos && videos.length > 0) {
//       checkVideoEmbeds();
//     }
//   }, [videos]);

//   // Test if a video can be embedded
//   const testVideoEmbed = async (url) => {
//     return new Promise((resolve) => {
//       const videoId = extractVideoId(url);
//       if (!videoId) {
//         resolve(false);
//         return;
//       }

//       const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
//       // Create a hidden iframe to test embedding
//       const testIframe = document.createElement('iframe');
//       testIframe.src = embedUrl;
//       testIframe.style.display = 'none';
//       testIframe.style.width = '1px';
//       testIframe.style.height = '1px';
      
//       let timeoutId;
      
//       const cleanup = () => {
//         if (testIframe.parentNode) {
//           testIframe.parentNode.removeChild(testIframe);
//         }
//         if (timeoutId) {
//           clearTimeout(timeoutId);
//         }
//       };

//       testIframe.onload = () => {
//         // If iframe loads successfully, assume it can be embedded
//         cleanup();
//         console.log('Video can run successfully in an iframe')
//         resolve(true);
//       };

//       testIframe.onerror = () => {
//         cleanup();
//         console.log('Video is not running successfully in an iframe')
//         resolve(false);
//       };

//       // Set a timeout in case the iframe doesn't trigger load/error events
//       timeoutId = setTimeout(() => {
//         cleanup();
//         resolve(false);
//       }, 3000);

//       document.body.appendChild(testIframe);
//     });
//   };

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

//   const convertToWatchUrl = (url) => {
//     const videoId = extractVideoId(url);
//     if (videoId) {
//       console.log(`New direct link to video generated: https://www.youtube.com/watch?v=${videoId}`);
//       return `https://www.youtube.com/watch?v=${videoId}`;
//     }
//     return url;
//   };

//   const handleVideoClick = (video) => {
//     const canEmbed = videoEmbedStatus[video.url];
    
//     if (canEmbed) {
//       // Open in modal if video can be embedded
//       console.log('Video is embedded successfully!');
//       setSelectedVideo(video);
//       setIsModalOpen(true);
//     } else {
//       // Redirect to YouTube if video cannot be embedded
//       console.log('Video is not embedded successfully!');
//       const watchUrl = convertToWatchUrl(video.url);
//       window.open(watchUrl, "_blank");
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedVideo(null);
//   };

//   const handleEmbedError = (video) => {
//     // If embed fails in modal, redirect to YouTube
//     setIsModalOpen(false);
//     setSelectedVideo(null);
//     const watchUrl = convertToWatchUrl(video.url);
//     window.open(watchUrl, "_blank");
//   };

//   if (!videos || videos.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-gray-500">No videos available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {videos.map((video, index) => (
//           <VideoThumbnail
//             key={index}
//             video={video}
//             onClick={() => handleVideoClick(video)}
//           />
//         ))}
//       </div>

//       {selectedVideo && (
//         <VideoModal
//           video={selectedVideo}
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           onEmbedError={handleEmbedError}
//         />
//       )}
//     </div>
//   );
// };

// VideoGallery.propTypes = {
//   videos: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       url: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default VideoGallery;

