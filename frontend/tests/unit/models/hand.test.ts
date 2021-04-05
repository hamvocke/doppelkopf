import { Hand } from "@/models/hand";
import { Card, Rank, Suit, ace, ten, king, queen, jack } from "@/models/card";
import { allCards } from "@/models/deck";
import { shuffle } from "lodash";

test("a hand with queen of clubs is re", () => {
  const cards = [queen.of(Suit.Clubs)];
  const hand = new Hand(cards);

  expect(hand.isRe()).toBeTruthy();
  expect(hand.isKontra()).toBeFalsy();
});

test("a re hand that played the queen of clubs is still re", () => {
  const queenOfClubs = queen.of(Suit.Clubs);
  const tenOfHearts = ten.of(Suit.Hearts);
  const hand = new Hand([queenOfClubs, tenOfHearts]);

  hand.remove(queenOfClubs);

  expect(hand.isRe()).toBeTruthy();
  expect(hand.isKontra()).toBeFalsy();
});

test("a hand without queen of clubs is kontra", () => {
  const cards = [queen.of(Suit.Spades)];
  const hand = new Hand(cards);

  expect(hand.isKontra()).toBeTruthy();
  expect(hand.isRe()).toBeFalsy();
});

test("hand has a value", () => {
  const cards = [
    queen.of(Suit.Spades),
    ten.of(Suit.Hearts),
    ace.of(Suit.Diamonds)
  ];
  const hand = new Hand(cards);

  expect(hand.value()).toBe(24);
});

test("empty hand has a value of 0", () => {
  const hand = new Hand([]);

  expect(hand.value()).toBe(0);
});

test("can find specific card on hand", () => {
  const queenOfSpades = queen.of(Suit.Spades);
  const cards = [queenOfSpades];
  const hand = new Hand(cards);

  expect(hand.find(cards[0])).toEqual(queenOfSpades);
});

test("can find card on hand by rank and suit", () => {
  const queenOfSpades = queen.of(Suit.Spades);
  const cards = [queenOfSpades];
  const hand = new Hand(cards);

  expect(hand.findAny(Suit.Spades, Rank.Queen)).toEqual(queenOfSpades);
});

test("should return empty list if card on hand cannot be found by rank and suit", () => {
  const queenOfSpades = queen.of(Suit.Spades);
  const cards = [queenOfSpades];
  const hand = new Hand(cards);

  expect(hand.findAny(Suit.Spades, Rank.King)).toBeUndefined;
});

test("can not find non-existing card on hand", () => {
  const queenOfSpades = queen.of(Suit.Spades);
  const cards = [queenOfSpades];
  const hand = new Hand(cards);

  expect(hand.find(king.of(Suit.Spades))).toBeUndefined();
});

test("can remove card from hand", () => {
  const cards = [queen.of(Suit.Spades)];
  const hand = new Hand(cards);
  expect(hand.find(cards[0])).toBeDefined();

  hand.remove(cards[0]);

  expect(hand.find(cards[0])).toBeUndefined();
});

test("cannot remove non-existing card from hand", () => {
  const cards = [queen.of(Suit.Spades)];
  const hand = new Hand(cards);
  expect(hand.find(cards[0])).toBeDefined();

  function invalidRemove() {
    hand.remove(king.of(Suit.Diamonds));
  }

  expect(invalidRemove).toThrowError("can't remove card that isn't on hand");
});

test("should sort hand by visual order", () => {
  const cards = allCards;

  const hand = new Hand(shuffle(cards));

  const sortedDeck = [
    new Card(Rank.Ten, Suit.Hearts, 0),
    new Card(Rank.Ten, Suit.Hearts, 1),

    new Card(Rank.Queen, Suit.Clubs, 0),
    new Card(Rank.Queen, Suit.Clubs, 1),
    new Card(Rank.Queen, Suit.Spades, 0),
    new Card(Rank.Queen, Suit.Spades, 1),
    new Card(Rank.Queen, Suit.Hearts, 0),
    new Card(Rank.Queen, Suit.Hearts, 1),
    new Card(Rank.Queen, Suit.Diamonds, 0),
    new Card(Rank.Queen, Suit.Diamonds, 1),

    new Card(Rank.Jack, Suit.Clubs, 0),
    new Card(Rank.Jack, Suit.Clubs, 1),
    new Card(Rank.Jack, Suit.Spades, 0),
    new Card(Rank.Jack, Suit.Spades, 1),
    new Card(Rank.Jack, Suit.Hearts, 0),
    new Card(Rank.Jack, Suit.Hearts, 1),
    new Card(Rank.Jack, Suit.Diamonds, 0),
    new Card(Rank.Jack, Suit.Diamonds, 1),

    new Card(Rank.Ace, Suit.Diamonds, 0),
    new Card(Rank.Ace, Suit.Diamonds, 1),
    new Card(Rank.Ten, Suit.Diamonds, 0),
    new Card(Rank.Ten, Suit.Diamonds, 1),
    new Card(Rank.King, Suit.Diamonds, 0),
    new Card(Rank.King, Suit.Diamonds, 1),

    new Card(Rank.Ace, Suit.Clubs, 0),
    new Card(Rank.Ace, Suit.Clubs, 1),
    new Card(Rank.Ten, Suit.Clubs, 0),
    new Card(Rank.Ten, Suit.Clubs, 1),
    new Card(Rank.King, Suit.Clubs, 0),
    new Card(Rank.King, Suit.Clubs, 1),

    new Card(Rank.Ace, Suit.Spades, 0),
    new Card(Rank.Ace, Suit.Spades, 1),
    new Card(Rank.Ten, Suit.Spades, 0),
    new Card(Rank.Ten, Suit.Spades, 1),
    new Card(Rank.King, Suit.Spades, 0),
    new Card(Rank.King, Suit.Spades, 1),

    new Card(Rank.Ace, Suit.Hearts, 0),
    new Card(Rank.Ace, Suit.Hearts, 1),
    new Card(Rank.King, Suit.Hearts, 0),
    new Card(Rank.King, Suit.Hearts, 1)
  ];

  expect(hand.cards).toEqual(sortedDeck);
});

test("should detect hand with 5 kings as not playable", () => {
  const cards = [
    king.of(Suit.Hearts),
    ten.of(Suit.Hearts),
    queen.of(Suit.Spades),
    king.of(Suit.Diamonds),
    king.of(Suit.Clubs),
    king.of(Suit.Clubs),
    ten.of(Suit.Spades),
    king.of(Suit.Diamonds),
    queen.of(Suit.Spades),
    queen.of(Suit.Hearts)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(false);
});

test("should detect playable hand", () => {
  const cards = [
    king.of(Suit.Hearts),
    ten.of(Suit.Hearts),
    queen.of(Suit.Spades),
    king.of(Suit.Diamonds),
    ace.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ten.of(Suit.Spades),
    king.of(Suit.Diamonds),
    queen.of(Suit.Spades),
    queen.of(Suit.Hearts)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(true);
});

test("should detect hand with more than seven ten point cards", () => {
  const cards = [
    ace.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ten.of(Suit.Spades),
    ten.of(Suit.Spades),
    ten.of(Suit.Hearts),
    ten.of(Suit.Hearts),
    king.of(Suit.Hearts),
    queen.of(Suit.Spades),
    queen.of(Suit.Hearts)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(false);
});

test("should detect hand with trumps equal or lesser than jack of diamonds", () => {
  const cards = [
    king.of(Suit.Hearts),
    king.of(Suit.Hearts),
    ten.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ten.of(Suit.Spades),
    ten.of(Suit.Spades),
    ten.of(Suit.Diamonds),
    ten.of(Suit.Diamonds),
    jack.of(Suit.Diamonds),
    jack.of(Suit.Diamonds)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(false);
});

test("should detect suits that can be served", () => {
  const cards = [
    king.of(Suit.Hearts),
    king.of(Suit.Hearts),
    ten.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ten.of(Suit.Hearts),
    ten.of(Suit.Hearts),
    ten.of(Suit.Diamonds),
    ten.of(Suit.Diamonds),
    jack.of(Suit.Spades),
    jack.of(Suit.Spades)
  ];
  const hand = new Hand(cards);

  expect(hand.nonTrumps(Suit.Spades).length).toEqual(0);
  expect(hand.nonTrumps(Suit.Hearts).length).toEqual(2);
  expect(hand.nonTrumps(Suit.Clubs).length).toEqual(2);
  expect(hand.hasNonTrumps(Suit.Spades)).toBe(false);
  expect(hand.hasNonTrumps(Suit.Hearts)).toBe(true);
  expect(hand.hasNonTrumps(Suit.Clubs)).toBe(true);
});

test("should detect correct number of trumps in hand", () => {
  const cards = [
    king.of(Suit.Hearts),
    king.of(Suit.Hearts),
    ten.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ten.of(Suit.Spades),
    ten.of(Suit.Spades),
    ten.of(Suit.Diamonds),
    ten.of(Suit.Diamonds),
    jack.of(Suit.Diamonds),
    jack.of(Suit.Diamonds)
  ];
  const hand = new Hand(cards);

  expect(hand.trumps().length).toEqual(4);
});

test("should detect multiple single blank aces", () => {
  const cards = [
    ace.of(Suit.Hearts).first(),
    ace.of(Suit.Spades).first(),
    king.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ace.of(Suit.Clubs),
    ten.of(Suit.Hearts),
    ten.of(Suit.Hearts),
    queen.of(Suit.Diamonds),
    ace.of(Suit.Diamonds),
    jack.of(Suit.Spades)
  ];
  const hand = new Hand(cards);

  expect(hand.hasBlankAce(Suit.Clubs)).toBe(false);
  expect(hand.hasBlankAce(Suit.Hearts)).toBe(true);
  expect(hand.hasBlankAce(Suit.Spades)).toBe(true);
  expect(hand.getBlankAces()).toEqual([
    ace.of(Suit.Spades).first(),
    ace.of(Suit.Hearts).first()
  ]);
});

test("should detect low value cards in hand", () => {
  const cards = [
    ace.of(Suit.Hearts).first(),
    ace.of(Suit.Spades).first(),
    king.of(Suit.Clubs),
    ten.of(Suit.Clubs),
    ace.of(Suit.Clubs),
    ten.of(Suit.Hearts),
    ten.of(Suit.Hearts),
    queen.of(Suit.Diamonds),
    ace.of(Suit.Diamonds),
    jack.of(Suit.Spades)
  ];
  const hand = new Hand(cards);

  expect(hand.lowValues().length).toBe(2);
});
