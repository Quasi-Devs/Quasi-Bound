const db = require('../index');

const getUser = async (id) => {
  let userData = await db.query(`SELECT * FROM "user" WHERE discord_link = '${id}'`).catch((err) => console.warn(err));
  if (!userData.rows[0]) {
    userData = await db.query(`SELECT * FROM "user" WHERE google_link = '${id}'`).catch((err) => console.warn(err));
  }
  return userData;
};

const getAllUser = async () => {
  const userData = await db.query('SELECT * FROM "user"');
  return userData;
};

const addEnemy = async (idUser, idEnemy) => {
  await db.query(`UPDATE "user" SET id_enemy = ${idEnemy} WHERE id = ${idUser}`).catch((err) => console.warn(err));
};

const addDescription = async (idUser, description) => {
  await db.query(`UPDATE "user" SET description = '${description}' WHERE id = ${idUser}`);
};

const updateWins = async (idUser, winScore) => {
  await db.query(`UPDATE "user" SET total_win = ${winScore} WHERE id = ${idUser}`);
};

const updateGames = async (idUser, gameScore) => {
  await db.query(`UPDATE "user" SET total_games = ${gameScore} WHERE id = ${idUser}`);
};

const updateELO = async (idUser, elo) => {
  await db.query(`UPDATE "user" SET count_rating = ${elo} WHERE id = ${idUser}`);
};

const getCards = async (userId) => {
  const cardData = await db.query(`SELECT * FROM "user_card" WHERE id_user = ${userId}`).catch((err) => console.warn(err));

  const cards = cardData.rows.map(async (record) => {
    const result = await db.query(`SELECT * FROM "card" WHERE id = ${record.id_card}`).catch((err) => console.warn(err));
    return result.rows[0];
  });
  return Promise.all(cards);
};

const updateArea = async (idUser, city) => {
  await db.query(`UPDATE "user" SET area = '${city}' WHERE id = ${idUser}`);
};

const setDefaultDeck = async ({ userId, deckId }) => {
  await db.query(`UPDATE "user" SET default_deck = ${deckId} WHERE id = ${userId}`).catch((err) => console.warn(err));
};

module.exports = {
  getUser,
  addEnemy,
  getCards,
  getAllUser,
  addDescription,
  updateGames,
  updateWins,
  setDefaultDeck,
  updateELO,
  updateArea,
};
