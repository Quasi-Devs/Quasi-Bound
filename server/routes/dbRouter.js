const { Router } = require('express');
const Card = require('../db/models/card');
const Deck = require('../db/models/deck');
const User = require('../db/models/user');

const dbRouter = Router();

dbRouter.get('/cards', async (req, res) => {
  Card.getCards(req.query)
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => { console.error(err); res.sendStatus(500); });
});

dbRouter.post('/cards', async (req, res) => {
  await Card.createCard(req.body);
  res.sendStatus(201);
});

dbRouter.get('/user', async (req, res) => {
  const info = await User.getUser(req.cookies.QuasiBoundId);
  res.json(info.rows[0]);
});

dbRouter.get('/logout', (req, res) => {
  res.clearCookie('QuasiBoundId');
  req.session.destroy();
  res.redirect('/');
});

dbRouter.post('/deck', async (req, res) => {
  await Deck.createDeck(req.body);
  res.sendStatus(201);
});

dbRouter.get('/deck/:id', async (req, res) => {
  const decks = await Deck.getDecksByUser(req.params.id);
  res.status(200).json(decks);
});

dbRouter.post('/addcard', async (req, res) => {
  await Deck.addCardToDeck(req.body);
  res.sendStatus(201);
});

dbRouter.get('/deckcards/:id', async (req, res) => {
  const cards = await Deck.getCardsFromDeck(req.params.id);
  res.status(200).send(cards);
});

module.exports = dbRouter;
