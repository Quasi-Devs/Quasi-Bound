const db = require('../index');

const getUser = async (id) => {
  let userData = await db.query(`SELECT * FROM "user" WHERE discord_link = '${id}'`);
  if (!userData.rows[0]) {
    userData = await db.query(`SELECT * FROM "user" WHERE google_link = '${id}'`);
  }
  return userData;
};

const addEnemy = async (idUser, idEnemy) => {
  await db.query(`UPDATE "user" SET id_enemy = ${idEnemy} WHERE id = ${idUser}`);
};

module.exports = {
  getUser,
  addEnemy,
};
