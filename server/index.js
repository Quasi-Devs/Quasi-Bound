const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const passport = require('passport');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const User = require('./db/models/user');
// const router = Router();

const app = express();
const sever = http.createServer(app);
const io = socketio(sever);
const PORT = process.env.PORT || 8080;
const dirPath = path.join(__dirname, '..', 'client', 'dist');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
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
  const From = Buffer.from;
  const b64 = new From(req.file.buffer).toString('base64');
  const mimeType = 'img/png';
  res.send(`data:${mimeType};base64,${b64}`);
});

const discordRoute = require('./routes/discordAuth');
require('./auth/discordStrategy');
const dbRouter = require('./routes/dbRouter');

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
app.use('/data', dbRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

const players = [];
io.on('connection', (socket) => {
  socket.on('placed', (enemy, array, card) => {
    io.emit(`${enemy}`, array, card);
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

  socket.on('Queue', (id) => {
    players.push(id);
    if (players.length % 2 === 0 && players.length) {
      players.forEach((player) => {
        if (player !== id) {
          User.addEnemy(id, player);
          User.addEnemy(player, id);
        }
      });
      io.emit(`${players.shift()}`);
      io.emit(`${players.shift()}`);
    }
  });
  socket.on('DeQueue', (id) => {
    const index = players.indexOf(id);
    if (index > -1) {
      players.splice(index, 1);
    }
  });
});

sever.listen(PORT, () => {
  console.info(`http://localhost:${PORT}`);
});
