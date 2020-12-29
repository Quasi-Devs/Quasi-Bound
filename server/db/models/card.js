const db = require('../index');

const createCard = async (rp, thumbnail, description, attack, health, armor, isCharacter, size) => {
  const result = await db.query(`INSERT INTO "card" (point_resource, thumbnail, description, point_attack, point_health, point_armor, is_character, size) VALUES (
      '${rp}', '${thumbnail}', '${description}', '${attack}', '${health}', '${armor}', '${rp}', ${isCharacter}, '${size}'
      );`);
  return result;
};

const getCards = async (options) => {
  const cards = await db.query(`SELECT * FROM "card" WHERE ${options}`);
  return cards;
};

module.exports = {
  getCards,
  createCard,
};
