import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import deckReducer, { drawCard, fetchDeck } from '../redux/deckSlice';
import Deck from './Deck';


jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url.includes('/new/shuffle/')) {
      return Promise.resolve({ data: { deck_id: 'test_deck_id', remaining: 52 } });
    }
    if (url.includes('/draw/')) {
      return Promise.resolve({ data: { cards: [{ code: 'AS', value: 'Ace', suit: 'Spades' }], remaining: 51 } });
    }
    if (url.includes('/shuffle/')) {
      return Promise.resolve({ data: { success: true, deck_id: 'test_deck_id', remaining: 52, shuffled: true } });
    }
  }),
}));

let store;

beforeEach(() => {
  store = configureStore({ reducer: { deck: deckReducer } });
});

describe('Deck renders and matches snapshot', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Deck />
      </Provider>
    );
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Deck />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('deck reducer', () => {
  test('should handle initial state', () => {
    expect(deckReducer(undefined, {})).toEqual({ deck_id: null, remaining: 0, cards: [], status: 'idle', error: null });
  });

  test('should handle fetchDeck', async () => {
    const previousState = { deck_id: null, remaining: 0, cards: [], status: 'idle', error: null };
    const action = fetchDeck.fulfilled({ deck_id: 'test_deck_id', remaining: 52 }, 'requestId', undefined);
    expect(deckReducer(previousState, action)).toEqual({ deck_id: 'test_deck_id', remaining: 52, cards: [], status: 'succeeded', error: null });
  });

  // Add tests for drawCard and shuffleDeck
});

describe('Deck component', () => {
  test('draws a card when button is clicked', async () => {
    const { findByText, getByAltText } = render(
      <Provider store={store}>
        <Deck />
      </Provider>
    );

    const button = await findByText('Draw a card');

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByAltText('Ace of Spades')).toBeInTheDocument();
    });
  });

  test('shuffles the deck when button is clicked', async () => {
    const { findByText, queryByAltText } = render(
      <Provider store={store}>
        <Deck />
      </Provider>
    );

    const button = await findByText('Shuffle the deck');

    fireEvent.click(button);

    await waitFor(() => {
      // Check that the previously drawn card is no longer in the document
      expect(queryByAltText('Ace of Spades')).not.toBeInTheDocument();
    });
  });
});
