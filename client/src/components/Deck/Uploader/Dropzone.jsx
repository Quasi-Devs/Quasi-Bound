import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const Dropzone = ({ disabled, onFiles }) => {
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = React.createRef();

  const openFileDialog = () => {
    if (disabled) {
      return;
    }
    fileInputRef.current.click();
  };

  const fileListToArray = (list) => {
    const array = [];
    for (let i = 0; i < list.length; i += 1) {
      array.push(list.item(i));
    }
    return array;
  };

  const onFilesAdded = (e) => {
    if (disabled) {
      return;
    }
    const { files } = e.target;
    if (onFiles) {
      const array = fileListToArray(files);
      onFiles(array);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();

    if (disabled) {
      return;
    }
    setHighlight(true);
  };

  const onDragLeave = () => setHighlight(false);

  const onDrop = (e) => {
    e.preventDefault();

    if (disabled) {
      return;
    }
    const { files } = e.dataTransfer;
    if (onFiles) {
      const array = fileListToArray(files);
      onFiles(array);
    }
    setHighlight(false);
  };

  return (
    <div
      className={`dropzone ${highlight ? 'highlight' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <CloudUploadIcon className="icon" />
      <input ref={fileInputRef} className="fileInput" type="file" multiple onChange={onFilesAdded} />
      <span>Upload Files</span>
    </div>
  );
};

Dropzone.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onFiles: PropTypes.func.isRequired,
};

export default Dropzone;
