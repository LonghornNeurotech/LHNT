import { useState, useCallback } from "react";
import PropTypes from "prop-types";

const FileUploadDropzone = ({ onFilesSelected, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected, disabled]);

  const handleFileSelect = useCallback((e) => {
    if (disabled) return;
    
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
    e.target.value = '';
  }, [onFilesSelected, disabled]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        disabled
          ? "border-gray-300 bg-gray-100 cursor-not-allowed"
          : isDragOver
          ? "border-blue-500 bg-blue-50"
          : "border-gray-400 bg-gray-50 hover:border-blue-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload-input"
        disabled={disabled}
      />
      <label
        htmlFor="file-upload-input"
        className={`cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
      >
        <div className="space-y-2">
          <div className="text-4xl text-gray-400">📁</div>
          <div className="text-lg font-medium text-gray-700">
            {disabled ? "Upload Disabled" : "Drop files here or click to browse"}
          </div>
          <div className="text-sm text-gray-500">
            {disabled ? "" : "Support for any file type, any number of files, no size limit"}
          </div>
        </div>
      </label>
    </div>
  );
};

FileUploadDropzone.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default FileUploadDropzone;