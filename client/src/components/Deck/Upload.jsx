import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import PropTypes from 'prop-types';
import ml5 from 'ml5';
import axios from 'axios';
import 'regenerator-runtime/runtime';

import './upload.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Prob from '../../../helpers/probabilityHelpers';
import statCollector from '../../../helpers/statCollector';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Upload = ({
  setCardImage, setTitle, title, setStats,
}) => {
  const [files, setFiles] = useState([]);

  const uploadFile = async () => {
    const form = new FormData();
    form.append('file', files[0].file, files[0].file.name);
    const { data: url } = await axios.post('/upload', form, { 'Content-Type': 'multipart/form-data' });
    setCardImage(url);
    const stats = await statCollector(url, ml5, Prob, title);
    setStats(stats);
  };

  return (
    <div className="upload">
      <span className="title">Upload Files</span>
      <div className="content">
        <div>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            name="files"
            labelIdle={'Drag & Drop your files or <span class="filepond--label-action">Browse</span>'}
          />
          <input type="text" id="name" name="name" onChange={(e) => setTitle(e.target.value)} />
          <button type="submit" className="daakfsfabfk" onClick={uploadFile}>Upload</button>
        </div>
      </div>
    </div>
  );
};

Upload.propTypes = {
  setCardImage: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setStats: PropTypes.func.isRequired,
};

export default Upload;
