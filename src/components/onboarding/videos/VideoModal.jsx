import PropTypes from "prop-types";

const VideoModal = ({ url, title, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-full max-w-3xl mx-4 flex flex-col items-end">
        <div className="mb-2 mr-2">
          <button
            onClick={onClose}
            aria-label="Close video"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-90 text-black text-2xl font-bold shadow-lg hover:bg-red-500 hover:text-white transition"
          >
            ×
          </button>
        </div>
        <div className="rounded-xl shadow-lg w-full bg-white overflow-hidden">
          <div style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src={url}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
          {title && (
            <div className="p-3 text-center font-semibold text-prussian_blue">
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

VideoModal.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VideoModal;

// import PropTypes from "prop-types";

// const VideoModal = ({ url, title, open, onClose }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//       <div className="w-full max-w-7xl mx-4 flex flex-col items-end">
//         {/* Close button above video container */}
//         <div className="mb-2 mr-2">
//             <button
//                 onClick={onClose}
//                 aria-label="Close video"
//                 className="
//                     w-10 h-10 flex items-center justify-center 
//                     rounded-full bg-white bg-opacity-90 
//                     text-prussian_blue text-2xl font-bold shadow-lg 
//                     hover:bg-red-500 hover:text-white transition
//                 "
//                 >
//                 ×
//             </button>
//         </div>
//         {/* Video and title container */}
//         <div className="rounded-lg overflow-hidden bg-white shadow-lg w-full">
//           <div style={{ aspectRatio: "16 / 9" }}>
//             <iframe
//               src={url}
//               title={title}
//               className="w-full h-full"
//               allowFullScreen
//             />
//           </div>
//           {title && (
//             <div className="p-4 text-left font-semibold text-prussian_blue">
//               {title}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// VideoModal.propTypes = {
//   url: PropTypes.string.isRequired,
//   title: PropTypes.string,
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default VideoModal;