import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDeck = createAsyncThunk('deck/fetchDeck', async () => {
  const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
  return response.data;
});

export const drawCard = createAsyncThunk('deck/drawCard', async (deck_id) => {
  const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`);
  return response.data;
});


export const shuffleDeck = createAsyncThunk('deck/shuffleDeck', async (deck_id) => {
  const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
  return response.data;
});

// each card is an object with a code, image, value, and suit
const deckSlice = createSlice({
  name: 'deck',
  initialState: { deck_id: null, remaining: 0, cards: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeck.fulfilled, (state, action) => {
        state.deck_id = action.payload.deck_id;
        state.remaining = action.payload.remaining;
        state.status = 'succeeded';
      })
      .addCase(drawCard.fulfilled, (state, action) => {
        state.cards.push(action.payload.cards[0]);
        state.remaining = action.payload.remaining;
      })
      .addCase(shuffleDeck.fulfilled, (state) => {
        state.cards = [];
        state.remaining = 52;
      });
  },
});

export default deckSlice.reducer;