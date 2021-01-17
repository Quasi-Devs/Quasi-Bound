const { Router } = require('express');
const Card = require('../db/models/card');
const Deck = require('../db/models/deck');
const User = require('../db/models/user');
const Friend = require('../db/models/friend');

const dbRouter = Router();

dbRouter.get('/cards', async (req, res) => {
  Card.getCards(req.query)
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => { console.error(err); res.sendStatus(500); });
});

dbRouter.post('/cards', async (req, res) => {
  const card = await Card.createCard(req.body).catch((err) => console.warn(err));
  res.status(201).send(card.rows[0]);
});

dbRouter.get('/user', async (req, res) => {
  const info = await User.getUser(req.cookies.QuasiBoundId).catch((err) => console.warn(err));
  if (info.rows[0]) {
    res.json(info.rows[0]);
  } else {
    res.json(null);
  }
});

dbRouter.get('/area/:city', async (req, res) => {
  const data = await User.getUser(req.cookies.QuasiBoundId).catch((err) => console.warn(err));
  const info = await User.updateArea(data.rows[0].id, req.params.city)
    .catch((err) => console.warn(err));
  if (data.rows[0]) {
    res.json(data.rows[0]);
  } else {
    res.json(info);
  }
});

dbRouter.get('/allUser', async (req, res) => {
  const info = await User.getAllUser();
  res.json(info.rows);
});

dbRouter.get('/addEnemy', async (req, res) => {
  const info = await User.getUser(req.cookies.QuasiBoundId).catch((err) => console.warn(err));
  User.addEnemy(info.rows[0].id, null);
  res.json('/game');
});

dbRouter.get('/logout', (req, res) => {
  res.clearCookie('QuasiBoundId');
  req.session.destroy();
  res.redirect('/');
});

dbRouter.post('/deck', async (req, res) => {
  await Deck.createDeck(req.body).catch((err) => console.warn(err));
  res.sendStatus(201);
});

dbRouter.get('/decks/:userId', async (req, res) => {
  const decks = await Deck.getDecksByUser(req.params.userId).catch((err) => console.warn(err));
  res.status(200).json(decks);
});

dbRouter.post('/addCard', async (req, res) => {
  await Deck.addCardToDeck(req.body).catch((err) => console.warn(err));
  res.sendStatus(201);
});

dbRouter.get('/deckCards/:deckId', async (req, res) => {
  const cards = await Deck.getCardsFromDeck(req.params.deckId).catch((err) => console.warn(err));
  res.status(200).send(cards);
});

dbRouter.post('/saveCard', async (req, res) => {
  await Card.saveCard(req.body).catch((err) => console.warn(err));
  res.sendStatus(201);
});

dbRouter.get('/userCards/:userId', async (req, res) => {
  const cards = await User.getCards(req.params.userId).catch((err) => console.warn(err));
  res.status(200).send(cards);
});

dbRouter.delete('/deckCard', async (req, res) => {
  await Deck.removeCardFromDeck(req.body).catch((err) => console.warn(err));
  res.sendStatus(204);
});

dbRouter.put('/defaultDeck', async (req, res) => {
  await User.setDefaultDeck(req.body).catch((err) => console.warn(err));
  res.sendStatus(200);
});

dbRouter.get('/wins/:userId/:num', async (req, res) => {
  const cards = await User.updateWins(req.params.userId, req.params.num)
    .catch((err) => console.warn(err));
  res.status(200).send(cards);
});

dbRouter.get('/games/:userId/:num', async (req, res) => {
  const cards = await User.updateGames(req.params.userId, req.params.num)
    .catch((err) => console.warn(err));
  res.status(200).send(cards);
});

dbRouter.get('/elo/:userId/:num', async (req, res) => {
  const cards = await User.updateELO(req.params.userId, req.params.num)
    .catch((err) => console.warn(err));
  res.status(200).send(cards);
});

dbRouter.get('/desc/:userId', async (req, res) => {
  const { description } = req.query;
  await User.addDescription(req.params.userId, description).catch((err) => console.warn(err));
  res.status(200).send(description);
});

dbRouter.get('/friends/:userID', async (req, res) => {
  const friends = await Friend.getFriends(req.params).catch((err) => console.warn(err));
  res.status(200).send(friends);
});

dbRouter.post('/friends', async (req, res) => {
  await Friend.addFriend(req.body).catch((err) => console.warn(err));
  res.sendStatus(201);
});

dbRouter.put('/friends', async (req, res) => {
  try {
    await Friend.removeFriend(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = dbRouter;
