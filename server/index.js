require('./db/index');
const express = require('express');
const cors = require('cors');
const { IncomingForm } = require('formidable');
// const { Router } = require('express');
const session = require('express-session');
const passport = require('passport');

// const router = Router();

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
    console.info(file.path);
  });
  form.on('end', () => res.json('hello'));
  form.parse(req);
});

const discordRoute = require('./routes/discordAuth');
// const discordStrategy = require('./auth/discordStrategy');
require('./auth/discordStrategy');

app.use(
  session({
    secret: process.env.DISCORD_CLIENT_SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    resave: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', discordRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT}`);
});
