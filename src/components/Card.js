import React from 'react';

const Card = ({ card }) => {
  return (
    <div>
      <img src={card.image} alt={`${card.value} of ${card.suit}`} />
    </div>
  );
};


export default React.memo(Card);