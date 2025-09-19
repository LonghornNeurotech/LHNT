import PropTypes from "prop-types";

const VideoModal = function ({ url, title, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" aria-modal="true" role="dialog">
      <div className="bg-white rounded shadow-lg p-4 max-w-3xl w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl"
          aria-label="Close video modal"
        >
          &times;
        </button>
        <iframe
          title={title}
          src={url}
          className="w-full h-96 rounded"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    </div>
  );
};

VideoModal.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VideoModal;