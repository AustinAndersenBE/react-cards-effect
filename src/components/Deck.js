import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeck, drawCard, shuffleDeck } from '../redux/deckSlice';
import Card from './Card';

//cards type is an array of objects
const Deck = () => {
  const dispatch = useDispatch();
  const { deck_id, remaining, cards, status } = useSelector((state) => state.deck);

  useEffect(() => {
    dispatch(fetchDeck());
  }, [dispatch]);

  const handleDrawCard = () => {
    if (remaining > 0) {
      dispatch(drawCard(deck_id));
    } else {
      alert('Error: no cards remaining!');
    }
  };

  const handleShuffleDeck = () => {
    dispatch(shuffleDeck(deck_id));
  };

  if (status === 'idle') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleDrawCard}>Draw a card</button>
      <button onClick={handleShuffleDeck} disabled={status === 'loading'}>Shuffle the deck</button>
      {cards.map((card) => (
        <Card key={card.code} card={card} />
      ))}
    </div>
  );
};

export default Deck;