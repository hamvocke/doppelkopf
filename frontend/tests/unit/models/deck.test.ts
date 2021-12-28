import { Deck } from "@/models/deck";
import { ace, Card, Rank, Suit } from "@/models/card";
import { RoundRules } from "@/models/rules";

test("deck has 48 cards", () => {
  const deck = new Deck();
  expect(deck.cards).toHaveLength(48);
});

test("sharp doko has 40 cards", () => {
  const deck = new Deck([RoundRules.SHARP_DOKO]);
  expect(deck.cards).toHaveLength(40);
});

test("deck has two aces of diamonds", () => {
  const deck = new Deck([RoundRules.SHARP_DOKO]);

  const firstAce = new Card(Rank.Ace, Suit.Diamonds, 0);
  const secondAce = new Card(Rank.Ace, Suit.Diamonds, 1);
  expect(deck.cards.filter(card => card.equals(firstAce))).toHaveLength(1);
  expect(deck.cards.filter(card => card.equals(secondAce))).toHaveLength(1);
});

test("deck is shuffled", () => {
  const oneDeck = new Deck();
  const anotherDeck = new Deck();

  expect(oneDeck.cards).not.toEqual(anotherDeck.cards);
});

test("deck updates piggies to be highest trump", () => {
  const deck = new Deck([RoundRules.SHARP_DOKO, RoundRules.PIGGIES]);
  expect(deck.cards.filter(card => card.isTrump())).toHaveLength(24);
  expect(deck.cards[0].trumps[0].is(ace.of(Suit.Diamonds))).toBe(true);
  expect(deck.cards[0].cardOrder[0].is(ace.of(Suit.Diamonds))).toBe(true);
  expect(deck.cards[0].cardOrder[1].is(ace.of(Suit.Diamonds))).toBe(true);
});

test("deck deals jack solo", () => {
  const deck = new Deck([RoundRules.JACK_SOLO]);
  expect(deck.cards.filter(card => card.isTrump())).toHaveLength(8);
  expect(
    deck.cards.filter(card => card.isTrump() && card.rank === Rank.Jack)
  ).toHaveLength(8);
});

test("deck deals queen solo", () => {
  const deck = new Deck([RoundRules.QUEEN_SOLO]);
  expect(deck.cards.filter(card => card.isTrump())).toHaveLength(8);
  expect(
    deck.cards.filter(card => card.isTrump() && card.rank === Rank.Queen)
  ).toHaveLength(8);
});

test("deck deals diamonds solo", () => {
  const deck = new Deck([RoundRules.DIAMONDS_SOLO, RoundRules.SHARP_DOKO]);
  expect(deck.cards.filter(card => card.isTrump())).toHaveLength(24);
  expect(
    deck.cards.filter(card => card.isTrump() && card.suit === Suit.Diamonds)
  ).toHaveLength(10);
});

test("deck deals hearts solo", () => {
  const deck = new Deck([RoundRules.HEARTS_SOLO, RoundRules.SHARP_DOKO]);
  expect(deck.cards.filter(card => card.isTrump())).toHaveLength(22);
  expect(
    deck.cards.filter(card => card.isTrump() && card.suit === Suit.Hearts)
  ).toHaveLength(10);
});

test("deck deals spades solo", () => {
  const deck = new Deck([RoundRules.SPADES_SOLO, RoundRules.SHARP_DOKO]);
  expect(deck.cards.filter(card => card.isTrump())).toHaveLength(24);
  expect(
    deck.cards.filter(card => card.isTrump() && card.suit === Suit.Spades)
  ).toHaveLength(10);
});

test("deck deals clubs solo", () => {
  const deck = new Deck([RoundRules.CLUBS_SOLO, RoundRules.SHARP_DOKO]);
  expect(deck.cards.filter(card => card.isTrump())).toHaveLength(24);
  expect(
    deck.cards.filter(card => card.isTrump() && card.suit === Suit.Clubs)
  ).toHaveLength(10);
});
