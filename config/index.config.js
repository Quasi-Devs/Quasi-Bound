require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const GCLOUD_PROJECT_ID = 'languine';

const GCLOUD_PROJECT_KEYFILE = path.join(__dirname, `./${process.env.BUCKET_KEYFILE}`);

const storage = new Storage({
  keyFilename: GCLOUD_PROJECT_KEYFILE,
  projectId: GCLOUD_PROJECT_ID,
});

module.exports = storage;
