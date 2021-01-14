import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import DeckHeader from './DeckHeader';
import CardsDisplay from './CardsDisplay';
import CreateCard from './CreateCard';
import Search from './Search';
import MyDecks from './MyDecks';

const Deck = ({ user, setUser }) => {
  const [loaded, setLoaded] = useState(false);
  const [allCardsInDb, setAllCardsInDb] = useState([]);
  const [gotDbCards, setGotDbCards] = useState(false);
  const [userDecks, setUserDecks] = useState([]);
  const [gotUserDecks, setGotUserDecks] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [gotUserCards, setGotUserCards] = useState(false);
  const [allDeckCards, setAllDeckCards] = useState({});
  const [gotDeckCards, setGotDeckCards] = useState(false);
  const [displayMode, setDisplayMode] = useState('browse');

  const sortCards = (a, b) => {
    if (a.point_resource > b.point_resource) {
      return 1;
    }
    if (a.point_resource < b.point_resource) {
      return -1;
    }
    if (a.point_health > b.point_health) {
      return 1;
    }
    if (a.point_health < b.point_health) {
      return -1;
    }
    if (a.point_attack > b.point_attack) {
      return 1;
    }
    if (a.point_attack < b.point_attack) {
      return -1;
    }
    if (a.point_armor > b.point_armor) {
      return 1;
    }
    if (a.point_armor < b.point_armor) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    if (user && gotDbCards && gotUserDecks && gotUserCards && gotDeckCards) {
      setLoaded(true);
    }
  }, [user, gotDbCards, gotUserDecks, gotUserCards, gotDeckCards]);

  useEffect(() => {
    if (user.id) {
      axios.get(`/data/decks/${user.id}`)
        .then(({ data }) => {
          setUserDecks(data);
          return data;
        })
        .then((decks) => {
          setGotUserDecks(true);
          const promises = decks.map((deck) => axios.get(`/data/deckCards/${deck.id}`).catch((err) => console.warn(err)));
          return Promise.all(promises);
        })
        .then((deckData) => {
          const deckCards = {};
          deckData.forEach((deck) => {
            const deckId = deck.config.url.slice(16);
            deckCards[deckId] = deck.data.sort(sortCards);
          });
          setAllDeckCards(deckCards);
        })
        .then(() => setGotDeckCards(true))
        .catch((err) => console.warn(err));
      axios.get(`/data/userCards/${user.id}`)
        .then(({ data }) => setUserCards(data))
        .then(() => setGotUserCards(true))
        .catch((err) => console.warn(err));
    }
  }, [user]);

  useEffect(() => {
    axios.get('/data/cards')
      .then(({ data }) => setAllCardsInDb(data))
      .then(() => setGotDbCards(true))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <BrowserRouter className="deckDisplay">
      {window.location.pathname.slice(0, 5) === '/deck' && <DeckHeader />}
      <Route exact path="/deck" render={() => <Redirect to="/deck/myDecks" />} />
      <Route path="/deck/myDecks">
        <MyDecks
          user={user}
          setUser={setUser}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          decks={userDecks}
          setDecks={setUserDecks}
          allDeckCards={allDeckCards}
          setAllDeckCards={setAllDeckCards}
          loaded={loaded}
          sortCards={sortCards}
        />
      </Route>
      <Route path="/deck/createCard">
        <CreateCard />
      </Route>
      <Route path="/deck/search">
        <Search user={user} cards={allCardsInDb} />
      </Route>
      <Route path="/deck/cards">
        <CardsDisplay
          user={user}
          displayMode={displayMode}
          myCards={userCards}
          myDecks={userDecks}
          setMyDecks={setUserDecks}
          allDeckCards={allDeckCards}
          setAllDeckCards={setAllDeckCards}
          sortCards={sortCards}
        />
      </Route>
    </BrowserRouter>
  );
};

Deck.propTypes = {
  user: PropTypes.shape().isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Deck;
