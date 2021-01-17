import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import PropTypes from 'prop-types';
import ml5 from 'ml5';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import { makeStyles } from '@material-ui/core/styles';

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
  const [lore, setLore] = useState('');
  const [error, setError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [loreError, setLoreError] = useState(false);
  const useStyles = makeStyles({
    titleInput: {
      border: `solid 1px ${titleError ? 'red' : '#ccc'}`,
    },
    loreInput: {
      border: `solid 1px ${loreError ? 'red' : '#ccc'}`,
    },
  });
  const classes = useStyles();

  const uploadFile = async () => {
    const badWords = lore.match(/(damage)|(Fly)|(Provoke)|(Charge)|(resource)/g);
    if (title === '') {
      setError('Card name is required.');
      setTitleError(true);
    } else if (badWords) {
      setError(`Invalid use of keyword: ${badWords.join(', ')}.`);
      setLoreError(true);
    } else {
      const form = new FormData();
      form.append('file', files[0].file, files[0].file.name);
      const { data: url } = await axios.post('/upload', form, { 'Content-Type': 'multipart/form-data' });
      setCardImage(url.buffer);
      const stats = await statCollector(url.image, ml5, Prob, title);
      console.info(stats);
      const card = {
        title: stats.title,
        description: lore ? `${stats.description}/${lore}` : stats.description,
        is_character: stats.isCharacter,
        point_armor: stats.armor,
        point_attack: stats.attack,
        point_health: stats.health,
        point_resource: stats.rp,
        size: stats.size,
        thumbnail: stats.thumbnail,
      };
      console.info(card);
      setStats(card);
    }
  };

  return (
    <div className="upload">
      <span className="title">Upload Files</span>
      <div className="content">
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={false}
          name="files"
          labelIdle={'Drag & Drop your files or <span class="filepond--label-action">Browse</span>'}
        />
        <input type="text" className={classes.titleInput} name="name" value={title} placeholder="Card Name" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" className={classes.loreInput} name="name" value={lore} placeholder="Card Description (Optional)" onChange={(e) => setLore(e.target.value)} />
        {error && <p><b>{error}</b></p>}
        <div>
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
