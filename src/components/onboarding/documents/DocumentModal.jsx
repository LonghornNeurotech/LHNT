import PropTypes from "prop-types";

const DocumentModal = ({ open, url, title, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-3 text-lg font-bold text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <div className="w-full h-[70vh]">
          {/* Display embedded viewer for PDFs */}
          {url.endsWith(".pdf") ? (
            <iframe
              src={url}
              title={title}
              className="w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <div>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Open Document
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DocumentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

DocumentModal.defaultProps = {
  url: "",
  title: "",
};

export default DocumentModal;