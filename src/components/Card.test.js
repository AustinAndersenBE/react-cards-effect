import React from 'react';
import { render } from '@testing-library/react'
import Card from './Card'

test('renders without crashing', () => {
  const card = { image: 'test_image.png', value: "JACK", suit: "SPADES" };
  render(<Card card={card} />)
});

test('snapshot test', () => {
  const card = { image: 'test_image.png', value: "JACK", suit: "SPADES" };
  const { asFragment } = render(<Card card={card} />);
  expect(asFragment()).toMatchSnapshot();
});
