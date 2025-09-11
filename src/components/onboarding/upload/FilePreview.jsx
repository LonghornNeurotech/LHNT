// Member users can see previews of the files they uploaded!
import PropTypes from 'prop-types';

const FilePreview = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="file-preview grid grid-cols-3 gap-4 mt-4">
      {files.map((file, idx) => {
        const isImage = file.type.startsWith('image/');
        return (
          <div key={idx} className="relative border rounded p-2 bg-white shadow">
            {isImage ? (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-24 object-cover rounded"
                onLoad={() => URL.revokeObjectURL(file)}
              />
            ) : (
              <div className="flex items-center justify-center h-24 bg-gray-100 rounded">
                <p className="text-xs break-words px-2">{file.name}</p>
              </div>
            )}
            <button
              type="button"
              aria-label={`Remove file ${file.name}`}
              onClick={() => onRemove(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};

FilePreview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilePreview;