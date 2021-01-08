const db = require('../index');

/**
 * createDeck will create a new deck instance that will persist in database
 * Should hold up to 30 cards per deck.
 * @param {*} cardId,
 * @param {*} userId,
 */
const createDeck = async ({ title, userId }) => {
  const deck = await db.query(`INSERT INTO "deck" (title, count_card) VALUES ('${title}', 0) RETURNING *`).catch((err) => console.warn(err));
  await db.query(`INSERT INTO "user_deck" (id_user, id_deck) VALUES (${userId}, ${deck.rows[0].id})`).catch((err) => console.warn(err));
  return deck.rows[0];
};

const getDecksByUser = async (userId) => {
  const deckData = await db.query(`SELECT * FROM "user_deck" WHERE id_user = ${userId}`).catch((err) => console.warn(err));

  const decks = deckData.rows.map(async (record) => {
    const result = await db.query(`SELECT * FROM "deck" WHERE id = ${record.id_deck}`).catch((err) => console.warn(err));
    return result.rows[0];
  });
  return Promise.all(decks);
};

const addCardToDeck = async ({ cardId, deckId, cardCount }) => {
  if (cardCount < 30) {
    const card = await db.query(`INSERT INTO "deck_card" (id_card, id_deck) VALUES (${cardId}, ${deckId})`).catch((err) => console.warn(err));
    const { rows: deckCards } = await db.query(`SELECT * FROM deck_card where id_deck = ${deckId}`).catch((err) => console.warn(err));
    await db.query(`UPDATE "deck" SET count_card = ${deckCards.length} WHERE id = ${deckId}`).catch((err) => console.warn(err));
    return card;
  }
  return null;
};

const getCardsFromDeck = async (deckId) => {
  const cardData = await db.query(`SELECT * FROM "deck_card" WHERE id_deck = ${deckId}`).catch((err) => console.warn(err));

  const cards = cardData.rows.map(async (record) => {
    const result = await db.query(`SELECT * FROM "card" WHERE id = ${record.id_card}`).catch((err) => console.warn(err));
    return result.rows[0];
  });
  return Promise.all(cards);
};

const removeCardFromDeck = async ({ cardId, deckId, cardCount }) => {
  if (cardCount > 0) {
    const { rows: dupes } = await db.query(`SELECT * FROM deck_card WHERE id_deck = ${deckId} AND id_card = ${cardId}`).catch((err) => console.warn(err));
    await db.query(`DELETE FROM deck_card WHERE id = ${dupes[0].id}`).catch((err) => console.warn(err));
    const { rows: deckCards } = await db.query(`SELECT * FROM deck_card where id_deck = ${deckId}`).catch((err) => console.warn(err));
    await db.query(`UPDATE "deck" SET count_card = ${deckCards.length} WHERE id = ${deckId}`).catch((err) => console.warn(err));
  }
};

module.exports = {
  createDeck,
  getDecksByUser,
  addCardToDeck,
  getCardsFromDeck,
  removeCardFromDeck,
};
