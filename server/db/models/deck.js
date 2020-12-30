const db = require('../index');

/**
 * createDeck will create a new deck instance that will persist in database
 * Should hold up to 30 cards per deck.
 * @param {*} idCard,
 * @param {*} idUser,
 */
const createDeck = async (idCard, idUser) => {
  const deck = await db.query(`INSERT INTO "deck" (id_card, id_user) VALUES (${idCard}, ${idUser})`);
  return deck;
};

const getDecksByUser = async (idUser) => {
  const deckData = await db.query(`SELECT * FROM "deck" WHERE id_user = ${idUser}`);
  return deckData;
};

module.exports = {
  createDeck,
  getDecksByUser,
};
