const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const dirPath = path.join(__dirname, '..', 'client', 'dist');

app.use(express.json());
app.use(express.static(dirPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT}`);
});
