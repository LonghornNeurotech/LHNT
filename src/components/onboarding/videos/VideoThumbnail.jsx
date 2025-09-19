import PropTypes from "prop-types";
import CompletionIcon from "../../common/CompletionIcon";

const VideoThumbnail = function ({ thumbnailUrl, title, required, onClick }) {
  return (
    <div className="relative cursor-pointer inline-block m-2" onClick={onClick} title={title}>
      <img src={thumbnailUrl} alt={title} className="rounded shadow-lg w-48 h-28 object-cover" />
      {required && (
        <div className="absolute top-1 right-1">
          <CompletionIcon />
        </div>
      )}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <svg className="w-12 h-12 text-white opacity-75" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
};

VideoThumbnail.propTypes = {
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

VideoThumbnail.defaultProps = {
  required: false,
};

export default VideoThumbnail;