const db = require('../index');

const getUser = async (id) => {
  const userData = await db.query(`SELECT * FROM "user" WHERE id_link = '${id}'`);
  return userData;
};

module.exports = {
  getUser,
};
