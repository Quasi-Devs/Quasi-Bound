import React, { useState } from 'react';
import PropType from 'prop-types';
import './2denv.css';

const Card = ({
  info, setClick, resourceCount, setTaken, i, setCardIndex,
}) => {
  const [hover, setHover] = useState(false);
  const handleHover = () => setHover(!hover);
  return (
    <div aria-hidden="true" className={hover ? 'hover' : 'card'} onClick={handleHover}>
      <div className={hover ? 'hover_title' : 'card_title'}>{info.title}</div>
      <div className={hover ? 'hover_resource' : 'card_resource'}>{hover ? `cost: ${info.point_resource}` : info.point_resource}</div>
      <img className={hover ? 'hover_img' : 'card_img'} src={info.thumbnail} alt="thumbnail" />
      <div className={hover ? 'hover_stats' : 'card_stats'}>
        <div>
          {
          hover ? `ATTACK: ${info.point_attack || 0}`
            : `A:${info.point_attack || 0}`
          }
        </div>
        <div>
          {
            hover ? `HEALTH: ${info.point_health || 0}`
              : `H:${info.point_health || 0}`
          }
        </div>
        <div>
          {
            hover ? `DEFENSE: ${info.point_armor || 0}` : `D:${info.point_armor || 0}`
          }
        </div>
      </div>
      <div className={hover ? 'hover_stats' : 'cardClass'}>{info.is_character ? 'Character' : 'Spell' }</div>
      <div className={hover ? 'hover_stats' : 'cardDesc'}>{info.description}</div>
      {hover ? (
        <button
          onClick={() => {
            if (resourceCount >= info.point_resource) {
              setTaken(info.point_resource);
              setCardIndex(i);
              setClick(info);
            }
          }}
          type="submit"
        >
          {(resourceCount >= info.point_resource) ? <div>{info.is_character ? 'ATTACK' : 'USE SPELL'}</div> : 'NOT ENOUGH RESOURCE'}
        </button>
      ) : null}
    </div>
  );
};
Card.propTypes = {
  info: PropType.shape({
    title: PropType.string,
    thumbnail: PropType.string,
    point_attack: PropType.number,
    point_health: PropType.number,
    point_armor: PropType.number,
    point_resource: PropType.string,
    is_character: PropType.bool,
    description: PropType.string,
  }).isRequired,
  setClick: PropType.func.isRequired,
  resourceCount: PropType.number.isRequired,
  setTaken: PropType.func.isRequired,
  i: PropType.number.isRequired,
  setCardIndex: PropType.func.isRequired,
};

export default Card;
