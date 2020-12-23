require('./db/index');
const express = require('express');
const cors = require('cors');
const { IncomingForm } = require('formidable');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const dirPath = path.join(__dirname, '..', 'client', 'dist');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.static(dirPath));
app.use(cors(corsOptions));

app.post('/upload', (req, res) => {
  const form = new IncomingForm();

  form.on('file', (field, file) => {
    console.info(file.type.slice(0, 5));
  });
  form.on('end', () => res.json());
  form.parse(req);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT}`);
});
