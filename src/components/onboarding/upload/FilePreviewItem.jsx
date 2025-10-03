// Users can click on Preview button to be able to see the files they uploaded (only apply to specific file types now!)
import { useState } from "react";
import PropTypes from "prop-types";

const FilePreviewItem = ({ file, onRemove }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (type) => {
    if (!type) return '📁';
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('document') || type.includes('word')) return '📝';
    if (type.includes('spreadsheet') || type.includes('excel')) return '📊';
    return '📁';
  };

  const canPreview = file.type && file.type.startsWith('image/');

  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <span className="text-2xl">{getFileTypeIcon(file.type)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(file.size)} • {file.type || 'Unknown type'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {canPreview && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              {showPreview ? 'Hide' : 'Preview'}
            </button>
          )}
          <button
            onClick={() => onRemove(file)}
            className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Remove
          </button>
        </div>
      </div>
      
      {showPreview && canPreview && (
        <div className="mt-3 bg-gray-50 p-2 rounded">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="max-w-full max-h-96 mx-auto rounded border shadow-sm object-contain"
            style={{ minHeight: '200px' }}
            onLoad={(e) => {
              // Clean up the object URL to prevent memory leaks
              setTimeout(() => URL.revokeObjectURL(e.target.src), 1000);
            }}
            onError={(e) => {
              console.error("Error loading image:", e);
            }}
          />
        </div>
      )}
    </div>
  );
};

FilePreviewItem.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default FilePreviewItem;