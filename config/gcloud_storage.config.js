require('util');
require('dotenv').config();
const gc = require('./index.config');

const bucket = gc.bucket(process.env.BUCKET_NAME);

const uploadImage = (file) => new Promise((res, rej) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream({
    resumable: false,
  });
  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res(publicUrl);
  })
    .on('error', (err) => {
      rej(err, 'Unable to upload image, something went wrong');
    })
    .end(buffer);
});

module.exports = uploadImage;
