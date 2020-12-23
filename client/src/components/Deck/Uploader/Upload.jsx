import React, { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import axios from 'axios';
import Dropzone from './Dropzone';
import Progress from './Progress';
import 'regenerator-runtime/runtime';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfulUpload, setSuccessfulUpload] = useState(false);

  const onFilesAdded = (newFiles) => setFiles([...files, ...newFiles]);

  const sendRequest = (file) => new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const copy = { ...uploadProgress };
        copy[file.name] = {
          state: 'pending',
          percentage: (event.loaded / event.total) * 100,
        };
        setUploadProgress(copy);
      }
    });

    req.upload.addEventListener('load', () => {
      const copy = { ...uploadProgress };
      copy[file.name] = {
        state: 'done',
        percentage: 100,
      };
      setUploadProgress(copy);
      resolve(req.response);
    });

    req.upload.addEventListener('error', () => {
      const copy = { ...uploadProgress };
      copy[file.name] = {
        state: 'error',
        percentage: 0,
      };
      setUploadProgress(copy);
      reject(req.response);
    });

    const formData = new FormData();
    formData.append('file', file, file.name);

    req.open('POST', 'http://localhost:8080/upload');
    req.send(formData);
  });

  const uploadFiles = async () => {
    setUploadProgress({});
    setUploading(true);
    const promises = files.map((file) => sendRequest(file));
    try {
      await Promise.all(promises);
      setSuccessfulUpload(true);
      setUploading(false);
    } catch (e) {
      console.warn(e);
      setSuccessfulUpload(true);
      setUploading(false);
    }
  };

  const renderActions = () => {
    if (successfulUpload) {
      return (
        <button
          type="button"
          onClick={() => {
            setFiles([]);
            setSuccessfulUpload(false);
          }}
        >
          Clear
        </button>
      );
    }
    return (
      <button type="button" disabled={files.length < 0 || uploading} onClick={uploadFiles}>
        Upload
      </button>
    );
  };

  const renderProgress = (file) => {
    const progress = uploadProgress[file.name];
    if (uploading || successfulUpload) {
      return (
        <div className="progressWrapper">
          <Progress progress={progress ? progress.percentage : 0} />
          <CheckCircleIcon style={{ opacity: progress && progress.state === 'done' ? 0.5 : 0 }} className="check" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="upload">
      <span className="title">Upload Files</span>
      <div className="content">
        <div>
          <Dropzone onFiles={onFilesAdded} disabled={uploading || successfulUpload} />
        </div>
        <div className="files">
          {files.map((file) => (
            <div key={file.name} className="row">
              <span className="filename">{file.name}</span>
              {renderProgress(file)}
            </div>
          ))}
        </div>
      </div>
      <div className="actions">{renderActions()}</div>
    </div>
  );
};

export default Upload;
