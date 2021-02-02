import React, { useState } from 'react';
import PropType from 'prop-types';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '../GameEnv/2DEnv/2denv.css';
import attackIcon from '../../models/attack-icon.png';
import heartIcon from '../../models/heart-icon.png';
import shieldIcon from '../../models/shield-icon.png';

const Card = ({
  info, setClick, resourceCount, setTaken, i, setCardIndex, onClick,
}) => {
  const [hover, setHover] = useState(!setClick);
  const handleHover = () => setClick && setHover(!hover);
  const attributes = info ? info.description.split('/')[0] : info.description;
  const lore = info && info.description.split('/')[1];
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
                {hover && (<img src={attackIcon} alt="attack thumb" width="25" height="25" />)}
                <span className="downwards">
                  {
                        ` ${info.point_attack || 0}`
              }
                </span>
              </div>
              <div className="stat">
                {hover && (<img src={heartIcon} alt="heart" width="22" height="22" />)}
                <span>
                  {
                        ` ${info.point_health || 0}`
              }
                </span>
              </div>
              <div className="stat">
                {hover && (<img src={shieldIcon} alt="shield" width="22" height="22" />)}
                <span>
                  {
                        ` ${info.point_armor || 0}`
              }
                </span>
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
        <Button
          variant="contained"
          type="primary"
          onClick={() => {
            if (resourceCount >= info.point_resource) {
              setTaken(info.point_resource);
              setCardIndex(i);
              setClick(info);
            }
          }}
          className="playcard"
        >
          {(resourceCount >= info.point_resource) ? <div><p className="playcardtext">{info.is_character ? 'ATTACK ad adw ad ' : 'USE SPELL'}</p></div> : <div><p className="playcardtext">NOT ENOUGH RESOURCE</p></div>}
        </Button>
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
  onClick: PropType.func.isRequired,
  resourceCount: PropType.number.isRequired,
  setTaken: PropType.func.isRequired,
  i: PropType.number.isRequired,
  setCardIndex: PropType.func.isRequired,
};

export default Card;
