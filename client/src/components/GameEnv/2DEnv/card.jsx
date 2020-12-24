import React, { useState } from 'react';
import PropType from 'prop-types';
import './2denv.css';

const Card = ({ info }) => {
  const [hover, setHover] = useState(false);
  const handleHover = () => setHover(!hover);
  // console.log(info);
  return (
    <div aria-hidden="true" className={hover ? 'hover' : 'card'} onClick={handleHover}>
      <div className={hover ? null : 'card_title'}>{info.title}</div>
      <div className={hover ? null : 'card_resource'}>{info.point_resource}</div>
      <img className={hover ? 'hover_img' : 'card_img'} src={info.thumbnail} alt="thumbnail" />
      <div className={hover ? null : 'card_stats'}>
        <div>
          A:
          {info.point_attack}
        </div>
        <div>
          H:
          {info.point_health}
        </div>
        <div>
          D:
          {info.point_armor}
        </div>
      </div>
      <div className={hover ? null : 'cardClass'}>{info.is_character ? 'Character' : 'Spell' }</div>
      <div className={hover ? null : 'cardDesc'}>{info.description}</div>
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
};

export default Card;
