const db = require('../index');

const getUser = async (id) => {
  let userData = await db.query(`SELECT * FROM "user" WHERE discord_link = '${id}'`);
  if (!userData.rows[0]) {
    userData = await db.query(`SELECT * FROM "user" WHERE google_link = '${id}'`);
  }
  return userData;
};

const getAllUser = async () => {
  const userData = await db.query('SELECT * FROM "user"');
  return userData;
};

const addEnemy = async (idUser, idEnemy) => {
  await db.query(`UPDATE "user" SET id_enemy = ${idEnemy} WHERE id = ${idUser}`);
};

const getCards = async (userId) => {
  const cardData = await db.query(`SELECT * FROM "user_card" WHERE id_user = ${userId}`);

  const cards = cardData.rows.map(async (record) => {
    const result = await db.query(`SELECT * FROM "card" WHERE id = ${record.id_card}`);
    return result.rows[0];
  });
  return Promise.all(cards);
};

module.exports = {
  getUser,
  addEnemy,
  getCards,
  getAllUser,
};
