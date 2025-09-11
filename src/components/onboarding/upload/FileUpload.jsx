// Handles file upload process to the website
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import FilePreview from './FilePreview';

const FileUpload = ({ files, setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        alert('Some files were rejected. Please check your files and try again.');
      }
      const newFiles = acceptedFiles.filter(
        (file) => !files.some((f) => f.name === file.name && f.size === file.size)
      );
      setFiles([...files, ...newFiles]);
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // no accept prop - accept all file types
  });

  const handleRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <section className="file-upload my-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
          isDragActive ? 'border-prussian_blue bg-gray-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-prussian_blue">Drop the files here...</p>
        ) : (
          <p>Drag & drop files here, or click to select files</p>
        )}
      </div>

      <FilePreview files={files} onRemove={handleRemove} />
    </section>
  );
};

FileUpload.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setFiles: PropTypes.func.isRequired,
};

export default FileUpload;