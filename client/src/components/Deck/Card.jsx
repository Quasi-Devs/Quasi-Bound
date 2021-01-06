import React from 'react';
import PropType from 'prop-types';
import './card.css';

const Card = ({ card, onClick }) => (
  <div className="cardDisplay" data-card={JSON.stringify(card)} onClick={onClick}>
    <div className="cardHeader">
      <div className="cardTitle">{card.title}</div>
      <div className="cardResource">{card.point_resource}</div>
    </div>
    <img className="cardThumbnail" src={card.thumbnail} alt="" />
    <div className="cardStats">
      <div className="stat">{card.point_health}</div>
      <div className="stat">{card.point_attack}</div>
      <div className="stat">{card.point_armor}</div>
    </div>
    <div>{card.description}</div>
  </div>
);

Card.propTypes = {
  card: PropType.shape({
    title: PropType.string,
    thumbnail: PropType.string,
    point_attack: PropType.number,
    point_health: PropType.number,
    point_armor: PropType.number,
    point_resource: PropType.string,
    is_character: PropType.bool,
    description: PropType.string,
  }).isRequired,
  onClick: PropType.func.isRequired,
};

export default Card;
