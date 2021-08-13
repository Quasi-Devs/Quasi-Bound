import axios from 'axios';
import $ from 'jquery';

const getAllCardsFromDb = async () => {
  const { data: cards } = await axios.get('data/cards').catch();
  return cards;
};

const censorText = async (word) => {
  const settings = {
    method: 'POST',
    url: 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-key': '2a1fc15ecemshda512c62df22efep12a1a8jsn73e48beaef33',
      'x-rapidapi-host': 'neutrinoapi-bad-word-filter.p.rapidapi.com',
    },
    data: {
      'censor-character': '*',
      content: word,
    },
  };
  const result = await $.ajax(settings).done((response) => response['censored-content']);
  return result['censored-content'];
};

export default {
  getAllCardsFromDb,
  censorText,
};
