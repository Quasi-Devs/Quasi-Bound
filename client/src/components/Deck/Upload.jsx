import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'regenerator-runtime/runtime';

import './upload.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Upload = () => {
  const [files, setFiles] = useState([]);

  return (
    <div className="upload">
      <span className="title">Upload Files</span>
      <div className="content">
        <div>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            server="/upload"
            name="files"
            labelIdle={'Drag & Drop your files or <span class="filepond--label-action">Browse</span>'}
          />
        </div>
      </div>
    </div>
  );
};

export default Upload;
