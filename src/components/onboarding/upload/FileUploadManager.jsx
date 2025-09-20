// Manages the processsing of any files user uploads
import { useState } from "react";
import PropTypes from "prop-types";
import FileUploadDropzone from "./FileUploadDropzone";
import FilePreviewItem from "./FilePreviewItem";

const FileUploadManager = ({ onComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fullName, setFullName] = useState("");
  const [eid, setEid] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFilesSelected = (newFiles) => {
    const filesWithId = newFiles.map(file => {
      const fileWithId = file;
      fileWithId.id = Date.now() + Math.random();
      return fileWithId;
    });
    setUploadedFiles(prev => [...prev, ...filesWithId]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileToRemove.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadedFiles.length > 0 && fullName.trim() && eid.trim()) {
      setSubmitted(true);
      onComplete && onComplete(true);
    }
  };

  const handleUploadMoreFiles = () => {
    // Reset form state to allow new submission
    setSubmitted(false);
    setFullName("");
    setEid("");
    setUploadedFiles([]);
  };

  const canSubmit = uploadedFiles.length > 0 && fullName.trim() && eid.trim();

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-1 mb-2">
        <h3 className="text-lg font-semibold mb-1">File Upload</h3>
        <span className="text-sm text-gray-700 mb-3">
          Upload at least one file and complete your submission information to complete this task.
        </span>
      </div>

      {!submitted ? (
        <div className="space-y-4">
          <FileUploadDropzone 
            onFilesSelected={handleFilesSelected}
            disabled={false}
          />

          {uploadedFiles.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">
                Uploaded Files ({uploadedFiles.length})
              </h4>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <FilePreviewItem
                    key={file.id}
                    file={file}
                    onRemove={handleRemoveFile}
                  />
                ))}
              </div>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Complete Your Submission</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="uploadFullName" className="block font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    id="uploadFullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border py-2 px-3 rounded w-full"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="uploadEid" className="block font-medium mb-1">
                    EID
                  </label>
                  <input
                    id="uploadEid"
                    type="text"
                    required
                    value={eid}
                    onChange={(e) => setEid(e.target.value)}
                    className="border py-2 px-3 rounded w-full"
                    placeholder="Enter your EID"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 font-semibold mb-2">
            Files uploaded successfully! You may now proceed.
          </p>
          <div className="text-sm text-green-600 mb-3">
            <p>Files uploaded: {uploadedFiles.length}</p>
            <p>Submitted by: {fullName} ({eid})</p>
          </div>
          <button
            onClick={handleUploadMoreFiles}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            📁 Upload More Files
          </button>
        </div>
      )}
    </div>
  );
};

FileUploadManager.propTypes = {
  onComplete: PropTypes.func
};

export default FileUploadManager;