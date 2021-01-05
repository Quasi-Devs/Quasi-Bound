const db = require('../index');

const createCard = async (
  {
    title, rp, thumbnail, description, attack, health, armor, isCharacter, size,
  },
) => {
  const result = await db.query(`INSERT INTO "card" (point_resource, thumbnail, description, point_attack, point_defence, point_armor, is_character, size, title) VALUES (
      '${rp}', '${thumbnail}', '${description}', '${attack}', '${health}', '${armor}', ${isCharacter}, '${size}', '${title}'
      );`);
  return result;
};

const getCards = async ({ key, value }) => {
  let cards;
  if (key && value) {
    cards = await db.query(`SELECT * FROM "card" WHERE ${key} = ${value}`);
  } else {
    cards = await db.query('SELECT * FROM "card"');
  }
  return cards;
};

const saveCard = async ({ userId, card }) => {
  await db.query(`INSERT INTO "user_card" (id_user, id_card) VALUES (${userId}, ${card.id})`);
};

module.exports = {
  getCards,
  createCard,
  saveCard,
};
