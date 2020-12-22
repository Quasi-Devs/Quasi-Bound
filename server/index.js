require('./db/index');
const express = require('express');
const { Router } = require('express');
const session = require('express-session');
const passport = require('passport');
const router = Router();

const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const dirPath = path.join(__dirname, '..', 'client', 'dist');
const discordRoute = require('./routes/discordAuth');
const discordStrategy = require('./auth/discordStrategy');

app.use(
  session({
    secret: 'some random secret',
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(dirPath));
app.use('/auth', discordRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.info(`http://localhost:${PORT}`);
});
