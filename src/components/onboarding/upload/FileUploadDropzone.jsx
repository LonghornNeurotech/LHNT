// Button to click on and select files or drag any files to upload the files!
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
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
        disabled
          ? "border-gray-300 bg-gray-100 cursor-not-allowed"
          : isDragOver
          ? "border-blue-500 bg-blue-50 scale-105"
          : "border-gray-400 bg-gray-50 hover:border-blue-400 hover:bg-blue-25"
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
        <div className="space-y-3">
          <div className={`text-5xl transition-transform ${isDragOver ? "scale-110" : ""}`}>
            📁
          </div>
          <div className="text-lg font-medium text-gray-700">
            {disabled 
              ? "Upload Disabled" 
              : isDragOver 
              ? "Drop files here!" 
              : "Drop files here or click to browse"}
          </div>
          <div className="text-sm text-gray-500">
            {disabled ? "" : "Support for any file type, any number of files, no size limit"}
          </div>
          {!disabled && (
            <div className="text-xs text-blue-600 font-medium">
              You can continue adding more files after uploading
            </div>
          )}
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