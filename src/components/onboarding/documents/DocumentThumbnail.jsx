import PropTypes from "prop-types";
import CompletionIcon from "../../common/CompletionIcon";

const DocumentThumbnail = ({ title, url, onClick, required }) => (
  <button
    className="group relative w-40 h-56 flex flex-col items-center bg-white rounded-md shadow hover:shadow-lg cursor-pointer"
    onClick={onClick}
    title={title}
  >
    <div className="w-24 h-32 mt-4 mb-2 flex items-center justify-center bg-gray-100 rounded">
      {/* Replace with preview image if available */}
      <span className="text-4xl text-gray-300">📄</span>
    </div>
    <div className="px-2 text-xs text-center line-clamp-2">{title}</div>
    {required && (
      <span className="absolute right-2 top-2">
        <CompletionIcon />
      </span>
    )}
  </button>
);

DocumentThumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

DocumentThumbnail.defaultProps = {
  required: false,
};

export default DocumentThumbnail;