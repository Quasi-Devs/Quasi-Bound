require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const http = require('http');
const cloudinary = require('cloudinary');
const path = require('path');
const multer = require('multer');
require('./auth/googleStrategy');

const app = express();
app.set('view engine', 'html');
const server = http.createServer(app);
const socketio = require('socket.io');
const User = require('./db/models/user');
const uploadImage = require('../config/gcloud_storage.config');

const PORT = process.env.PORT || 8080;
const dirPath = path.join(__dirname, '..', 'client', 'dist');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable('x-powered-by');
app.use(multerMid.single('file'));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(dirPath));
app.use(cors(corsOptions));

app.post('/upload', (req, res) => {
  if (req.file) {
    const From = Buffer.from;
    const b64 = new From(req.file.buffer).toString('base64');
    uploadImage(req.file).then((result) => {
      res.status(201).send({ image: result, buffer: `data:${req.file.mimetype};base64,${b64}`, file: req.file });
    }).catch(() => res.sendStatus(500));
  }
});

const discordRoute = require('./routes/discordAuth');
require('./auth/discordStrategy');
const dbRouter = require('./routes/dbRouter');
const googleRoute = require('./routes/googleAuth');

app.use(
  session({
    secret: process.env.DISCORD_CLIENT_SECRET,
    saveUninitialized: false,
    resave: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', googleRoute);
app.use('/auth', discordRoute);
app.use('/data', dbRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

let players = null;

if (module === require.main) {
  server.listen(PORT, () => {
    console.info(`http://localhost:${PORT}`);
  });
}

const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('placed', (enemy, array, card) => {
    io.emit(`${enemy}`, array, card);
  });

  socket.on('Spell', (spell, id) => {
    io.emit(`${id}Spell`, spell);
  });

  socket.on('Name', (name, id) => {
    io.emit(`${id}Name`, name);
  });

  socket.on('end', (id) => {
    io.emit(`${id}Turn`);
  });

  socket.on('HP', (id, hp, Ehp) => {
    io.emit(`${id}hp`, hp, Ehp);
  });

  socket.on('Invite', (userId, id, playerName) => {
    io.emit(`${userId} Accept?`, id, playerName);
  });

  socket.on('Accept', (userId, id) => {
    User.addEnemy(id, userId)
      .then(() => User.addEnemy(userId, id))
      .then(() => {
        io.emit(`${userId} Proceed`);
        io.emit(`${id} Proceed`);
      }).catch((err) => console.warn(err));
  });

  socket.on('Queue', (id) => {
    if (!players) {
      players = id;
    } else {
      User.addEnemy(id, players)
        .then(() => User.addEnemy(players, id))
        .then(() => {
          io.emit(`${players}`);
          io.emit(`${id}`);
          players = null;
        }).catch((err) => console.warn(err));
    }
  });

  socket.on('DeQueue', () => {
    players = null;
  });
});
