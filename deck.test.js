import Deck from './deck';
import Card from './card';
import isEqual from 'lodash/isEqual';

test('deck has 40 cards', () => {
    const deck = new Deck();
    expect(deck.cards.length).toBe(40);
});

test('deck has two aces of diamonds', () => {
    const deck = new Deck();

    const expectedCard = new Card('diamonds','ace');
    const foundCards = deck.cards.filter(card => isEqual(card, expectedCard));
    expect(foundCards.length).toBe(2);
});
