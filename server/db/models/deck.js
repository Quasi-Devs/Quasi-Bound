const db = require('../index');

/**
 * createDeck will create a new deck instance that will persist in database
 * Should hold up to 30 cards per deck.
 * @param {*} idCard,
 * @param {*} idUser,
 */
const createDeck = async ({ title, idUser }) => {
  const deck = await db.query(`INSERT INTO "deck" (title, count_card) VALUES ('${title}', 0) RETURNING *`);
  await db.query(`INSERT INTO "user_deck" (id_user, id_deck) VALUES (${idUser}, ${deck.rows[0].id})`);
  return deck.rows[0];
};

const getDecksByUser = async (idUser) => {
  const deckData = await db.query(`SELECT * FROM "user_deck" WHERE id_user = ${idUser}`);

  const decks = deckData.rows.map(async (record) => {
    const result = await db.query(`SELECT * FROM "deck" WHERE id = ${record.id_deck}`);
    return result.rows[0];
  });
  return Promise.all(decks);
};

const addCardToDeck = async ({ cardId, deckId, cardCount }) => {
  if (cardCount < 30) {
    const card = await db.query(`INSERT INTO "deck_card" (id_card, id_deck) VALUES (${cardId}, ${deckId})`);
    await db.query(`UPDATE "deck" SET count_card = ${cardCount + 1} WHERE id = ${deckId}`);
    return card;
  }
  return null;
};

const getCardsFromDeck = async (deckId) => {
  const cardData = await db.query(`SELECT * FROM "deck_card" WHERE id_deck = ${deckId}`);

  const cards = cardData.rows.map(async (record) => {
    const result = await db.query(`SELECT * FROM "card" WHERE id = ${record.id_card}`);
    return result.rows[0];
  });
  return Promise.all(cards);
};

module.exports = {
  createDeck,
  getDecksByUser,
  addCardToDeck,
  getCardsFromDeck,
};
