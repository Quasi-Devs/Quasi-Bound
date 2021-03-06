const db = require('../index');

const createCard = async (
  {
    title, rp, thumbnail, description, attack, health, armor, isCharacter, size,
  },
) => {
  const { rows: exists } = await db.query(`SELECT * FROM "card" WHERE thumbnail = '${thumbnail}';`);
  if (!exists.length) {
    const result = await db.query(`INSERT INTO "card" (point_resource, thumbnail, description, point_attack, point_health, point_armor, is_character, size, title) VALUES (
        '${rp}', '${thumbnail}', '${description}', '${attack}', '${health}', '${armor}', ${isCharacter}, '${size}', '${title}'
        ) RETURNING *;`).catch((err) => console.warn(err));
    return result;
  }
  return exists;
};

const getCards = async ({ key, value }) => {
  let cardData;
  if (key && value) {
    cardData = await db.query(`SELECT * FROM "card" WHERE ${key} = ${value}`).catch((err) => console.warn(err));
  } else {
    cardData = await db.query('SELECT * FROM "card"').catch((err) => console.warn(err));
  }
  return cardData.rows;
};

const saveCard = async ({ userId, card }) => {
  const { rows } = await db.query(`SELECT * from "user_card" WHERE (id_user = ${userId} AND id_card = ${card.id})`).catch((err) => console.warn(err));
  if (rows.length === 0) {
    await db.query(`INSERT INTO "user_card" (id_user, id_card) VALUES (${userId}, ${card.id})`).catch((err) => console.warn(err));
  }
};

const removeSavedCard = async ({ userId, card }) => {
  // console.log(card);
  const { rows } = await db.query(`SELECT * from "user_card" WHERE (id_user = ${userId} AND id_card = ${card.id})`).catch((err) => console.warn(err));
  if (rows.length > 0) {
    await db.query(`DELETE FROM "user_card" WHERE id_user = ${userId} AND id_card = ${card.id};`).catch((err) => console.warn(err));
  }
};

module.exports = {
  getCards,
  createCard,
  saveCard,
  removeSavedCard,
};
