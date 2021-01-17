import React, { useState } from 'react';
import PropType from 'prop-types';
import SecurityTwoToneIcon from '@material-ui/icons/SecurityTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import '../GameEnv/2DEnv/2denv.css';

const Card = ({
  info, setClick, resourceCount, setTaken, i, setCardIndex, onClick,
}) => {
  const [hover, setHover] = useState(!setClick);
  const handleHover = () => setClick && setHover(!hover);
  const attributes = info ? info.description.split('(')[0] : info.description;
  const lore = info && info.description.split('(')[1];
  return (
    <div className="cardpos" data-card={JSON.stringify(info)} onClick={onClick}>
      <div aria-hidden="true" className={hover ? 'hover card_background' : 'card card_background'} onClick={handleHover}>
        <div className={hover ? 'hover_title' : 'card_title'}>{info.title}</div>
        <div className={hover ? 'hover_resource' : 'card_resource'}>{hover ? `cost: ${info.point_resource}` : info.point_resource}</div>
        <img className={hover ? 'hover_img' : 'card_img'} src={info.thumbnail} alt="thumbnail" />
        {
          info.is_character && (
            <div className={hover ? 'top_stats' : 'card_stats'}>
              <div className="stat">
                {hover && (<img src="https://cdn4.iconfinder.com/data/icons/ancient-greece/48/Greek_Mythology-15-512.png" alt="attack thumb" width="30" height="30" />)}
                {
                        ` ${info.point_attack || 0}`
              }
              </div>
              <div className="stat">
                {hover && (<FavoriteTwoToneIcon />)}
                {
                          ` ${info.point_health || 0}`
              }
              </div>
              <div className="stat">
                {hover && (<SecurityTwoToneIcon />)}
                {
                          ` ${info.point_armor || 0}`
                        }
              </div>
            </div>
          )
        }
        <div className={hover ? 'is_character' : 'cardClass'}>{hover ? <div>{info.is_character ? 'Character' : 'Spell' }</div> : <div>{info.is_character ? 'Char' : 'Spell' }</div>}</div>
        {hover && (<div className="hover_stats">{attributes}</div>)}
        {hover && (<hr />)}
        {hover && (<div className="hover_lore"><i>{lore || null}</i></div>)}
      </div>
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
          className="playcard"
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
  onClick: PropType.func.isRequired,
};

export default Card;
