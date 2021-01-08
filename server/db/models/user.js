const db = require('../index');

const getUser = async (id) => {
  let userData = await db.query(`SELECT * FROM "user" WHERE discord_link = '${id}'`).catch((err) => console.warn(err));
  if (!userData.rows[0]) {
    userData = await db.query(`SELECT * FROM "user" WHERE google_link = '${id}'`).catch((err) => console.warn(err));
  }
  return userData;
};

const addEnemy = async (idUser, idEnemy) => {
  await db.query(`UPDATE "user" SET id_enemy = ${idEnemy} WHERE id = ${idUser}`).catch((err) => console.warn(err));
};

const getCards = async (userId) => {
  const cardData = await db.query(`SELECT * FROM "user_card" WHERE id_user = ${userId}`).catch((err) => console.warn(err));

  const cards = cardData.rows.map(async (record) => {
    const result = await db.query(`SELECT * FROM "card" WHERE id = ${record.id_card}`).catch((err) => console.warn(err));
    return result.rows[0];
  });
  return Promise.all(cards);
};

module.exports = {
  getUser,
  addEnemy,
  getCards,
};
