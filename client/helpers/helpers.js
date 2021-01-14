import axios from 'axios';

const getAllCardsFromDb = async () => {
  const { data: cards } = await axios.get('data/cards').catch();
  return cards;
};

module.exports = {
  getAllCardsFromDb,
};
