const db = require('../index');

const addFriend = async ({ userID, friendID }) => {
  try {
    await db.query(`INSERT INTO "friend" (id_user, id_friend) VALUES (${userID}, ${friendID})`);
  } catch (err) {
    console.error(err);
  }
};

const removeFriend = async ({ userID, friendID }) => {
  try {
    await db.query(`DELETE FROM "friend" WHERE (id_user = ${userID} AND id_friend = ${friendID})`);
  } catch (err) {
    console.error(err);
  }
};

const getFriends = async ({ userID }) => {
  try {
    const friendsList = await db.query(`SELECT * FROM "friend" WHERE id_user = ${userID}`);
    return friendsList;
  } catch (err) {
    console.error(err);
  }
  return null;
};

module.exports = {
  getFriends,
  removeFriend,
  addFriend,
};
