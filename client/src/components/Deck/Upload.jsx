import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
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
  setCardImage, setTitle, title, setStats, setLore, Lore,
}) => {
  const [files, setFiles] = useState([]);
  const [counter, setCounter] = useState(false);

  const uploadFile = async () => {
    if (Lore.includes('damage') || Lore.includes('Charge') || Lore.includes('Provoke') || Lore.includes('Fly') || Lore.includes('resource')) {
      setCounter('cannot use words (damage, Charge, Provoke, Fly, resource)');
    } else {
      const form = new FormData();
      form.append('file', files[0].file, files[0].file.name);
      const { data: url } = await axios.post('/upload', form, { 'Content-Type': 'multipart/form-data' });
      setCardImage(url.buffer);
      const stats = await statCollector(url.image, ml5, Prob, title);
      setStats(stats);
    }
  };

  return (
    <div className="upload">
      {counter ? (
        <div>
          <h3>{counter}</h3>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => setCounter(false)}
          >
            I Understand
          </Button>
        </div>
      ) : null}
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
          <input type="text" id="name" name="name" value={title} placeholder="Name of card" onChange={(e) => setTitle(e.target.value)} />
          <input type="text" id="name" name="name" value={Lore} placeholder="Lore of card (optional)" onChange={(e) => setLore(e.target.value)} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="daakfsfabfk"
            onClick={uploadFile}
          >
            Upload
          </Button>
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
  setLore: PropTypes.func.isRequired,
  Lore: PropTypes.string.isRequired,
};

export default Upload;
