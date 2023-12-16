import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import deckReducer from './redux/deckSlice';
import Deck from './components/Deck';

const store = configureStore({
  reducer: {
    deck: deckReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Deck />
    </Provider>
  );
}

export default App;
