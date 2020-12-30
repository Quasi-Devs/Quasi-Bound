const db = require('../index');

const getUser = async (id) => {
  const userData = await db.query(`SELECT * FROM "user" WHERE id_link = '${id}'`);
  return userData;
};

const addEnemy = async (idUser, idEnemy) => {
  await db.query(`UPDATE "user" SET id_enemy = ${idEnemy} WHERE id = ${idUser}`);
};

module.exports = {
  getUser,
  addEnemy,
};
