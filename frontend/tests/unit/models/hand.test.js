import { Hand } from "@/models/hand";
import { Card, ranks, suits, ace, ten, king, queen, jack } from "@/models/card";
import { allCards } from "@/models/deck";
import { shuffle } from "lodash";

test("a hand with queen of clubs is re", () => {
  const cards = [queen.of(suits.clubs)];
  const hand = new Hand(cards);

  expect(hand.isRe()).toBeTruthy();
  expect(hand.isKontra()).toBeFalsy();
});

test("a re hand that played the queen of clubs is still re", () => {
  const queenOfClubs = queen.of(suits.clubs);
  const tenOfHearts = ten.of(suits.hearts);
  const hand = new Hand([queenOfClubs, tenOfHearts]);

  hand.remove(queenOfClubs);

  expect(hand.isRe()).toBeTruthy();
  expect(hand.isKontra()).toBeFalsy();
});

test("a hand without queen of clubs is kontra", () => {
  const cards = [queen.of(suits.spades)];
  const hand = new Hand(cards);

  expect(hand.isKontra()).toBeTruthy();
  expect(hand.isRe()).toBeFalsy();
});

test("hand has a value", () => {
  const cards = [
    queen.of(suits.spades),
    ten.of(suits.hearts),
    ace.of(suits.diamonds)
  ];
  const hand = new Hand(cards);

  expect(hand.value()).toBe(24);
});

test("empty hand has a value of 0", () => {
  const hand = new Hand([]);

  expect(hand.value()).toBe(0);
});

test("can find card on hand", () => {
  const queenOfSpades = queen.of(suits.spades);
  const cards = [queenOfSpades];
  const hand = new Hand(cards);

  expect(hand.find(cards[0])).toEqual(queenOfSpades);
});

test("can not find non-existing card on hand", () => {
  const queenOfSpades = queen.of(suits.spades);
  const cards = [queenOfSpades];
  const hand = new Hand(cards);

  expect(hand.find(king.of(suits.spades))).toBeUndefined();
});

test("can remove card from hand", () => {
  const cards = [queen.of(suits.spades)];
  const hand = new Hand(cards);
  expect(hand.find(cards[0])).toBeDefined();

  hand.remove(cards[0]);

  expect(hand.find(cards[0])).toBeUndefined();
});

test("cannot remove non-existing card from hand", () => {
  const cards = [queen.of(suits.spades)];
  const hand = new Hand(cards);
  expect(hand.find(cards[0])).toBeDefined();

  function invalidRemove() {
    hand.remove(king.of(suits.diamonds));
  }

  expect(invalidRemove).toThrowError("can't remove card that isn't on hand");
});

test("should sort hand by visual order", () => {
  const cards = allCards;

  const hand = new Hand(shuffle(cards));

  const sortedDeck = [
    new Card(ranks.ten, suits.hearts, 0),
    new Card(ranks.ten, suits.hearts, 1),

    new Card(ranks.queen, suits.clubs, 0),
    new Card(ranks.queen, suits.clubs, 1),
    new Card(ranks.queen, suits.spades, 0),
    new Card(ranks.queen, suits.spades, 1),
    new Card(ranks.queen, suits.hearts, 0),
    new Card(ranks.queen, suits.hearts, 1),
    new Card(ranks.queen, suits.diamonds, 0),
    new Card(ranks.queen, suits.diamonds, 1),

    new Card(ranks.jack, suits.clubs, 0),
    new Card(ranks.jack, suits.clubs, 1),
    new Card(ranks.jack, suits.spades, 0),
    new Card(ranks.jack, suits.spades, 1),
    new Card(ranks.jack, suits.hearts, 0),
    new Card(ranks.jack, suits.hearts, 1),
    new Card(ranks.jack, suits.diamonds, 0),
    new Card(ranks.jack, suits.diamonds, 1),

    new Card(ranks.ace, suits.diamonds, 0),
    new Card(ranks.ace, suits.diamonds, 1),
    new Card(ranks.ten, suits.diamonds, 0),
    new Card(ranks.ten, suits.diamonds, 1),
    new Card(ranks.king, suits.diamonds, 0),
    new Card(ranks.king, suits.diamonds, 1),

    new Card(ranks.ace, suits.clubs, 0),
    new Card(ranks.ace, suits.clubs, 1),
    new Card(ranks.ten, suits.clubs, 0),
    new Card(ranks.ten, suits.clubs, 1),
    new Card(ranks.king, suits.clubs, 0),
    new Card(ranks.king, suits.clubs, 1),

    new Card(ranks.ace, suits.spades, 0),
    new Card(ranks.ace, suits.spades, 1),
    new Card(ranks.ten, suits.spades, 0),
    new Card(ranks.ten, suits.spades, 1),
    new Card(ranks.king, suits.spades, 0),
    new Card(ranks.king, suits.spades, 1),

    new Card(ranks.ace, suits.hearts, 0),
    new Card(ranks.ace, suits.hearts, 1),
    new Card(ranks.king, suits.hearts, 0),
    new Card(ranks.king, suits.hearts, 1)
  ];

  expect(hand.cards).toEqual(sortedDeck);
});

test("should detect hand with 5 kings as not playable", () => {
  const cards = [
    king.of(suits.hearts),
    ten.of(suits.hearts),
    queen.of(suits.spades),
    king.of(suits.diamonds),
    king.of(suits.clubs),
    king.of(suits.clubs),
    ten.of(suits.spades),
    king.of(suits.diamonds),
    queen.of(suits.spades),
    queen.of(suits.hearts)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(false);
});

test("should detect playable hand", () => {
  const cards = [
    king.of(suits.hearts),
    ten.of(suits.hearts),
    queen.of(suits.spades),
    king.of(suits.diamonds),
    ace.of(suits.clubs),
    ten.of(suits.clubs),
    ten.of(suits.spades),
    king.of(suits.diamonds),
    queen.of(suits.spades),
    queen.of(suits.hearts)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(true);
});

test("should detect hand with more than seven ten point cards", () => {
  const cards = [
    ace.of(suits.clubs),
    ten.of(suits.clubs),
    ten.of(suits.clubs),
    ten.of(suits.spades),
    ten.of(suits.spades),
    ten.of(suits.hearts),
    ten.of(suits.hearts),
    king.of(suits.hearts),
    queen.of(suits.spades),
    queen.of(suits.hearts)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(false);
});

test("should detect hand with trumps equal or lesser than jack of diamonds", () => {
  const cards = [
    king.of(suits.hearts),
    king.of(suits.hearts),
    ten.of(suits.clubs),
    ten.of(suits.clubs),
    ten.of(suits.spades),
    ten.of(suits.spades),
    ten.of(suits.diamonds),
    ten.of(suits.diamonds),
    jack.of(suits.diamonds),
    jack.of(suits.diamonds)
  ];
  const hand = new Hand(cards);

  expect(hand.isPlayable()).toBe(false);
});

test("should detect suits that can be served", () => {
  const cards = [
    king.of(suits.hearts),
    king.of(suits.hearts),
    ten.of(suits.clubs),
    ten.of(suits.clubs),
    ten.of(suits.hearts),
    ten.of(suits.hearts),
    ten.of(suits.diamonds),
    ten.of(suits.diamonds),
    jack.of(suits.spades),
    jack.of(suits.spades)
  ];
  const hand = new Hand(cards);

  expect(hand.nonTrumps(suits.spades).length).toEqual(0);
  expect(hand.nonTrumps(suits.hearts).length).toEqual(2);
  expect(hand.nonTrumps(suits.clubs).length).toEqual(2);
  expect(hand.hasNonTrumps(suits.spades)).toBe(false);
  expect(hand.hasNonTrumps(suits.hearts)).toBe(true);
  expect(hand.hasNonTrumps(suits.clubs)).toBe(true);
});

test("should detect correct number of trumps in hand", () => {
  const cards = [
    king.of(suits.hearts),
    king.of(suits.hearts),
    ten.of(suits.clubs),
    ten.of(suits.clubs),
    ten.of(suits.spades),
    ten.of(suits.spades),
    ten.of(suits.diamonds),
    ten.of(suits.diamonds),
    jack.of(suits.diamonds),
    jack.of(suits.diamonds)
  ];
  const hand = new Hand(cards);

  expect(hand.trumps().length).toEqual(4);
});

test("should detect multiple single blank aces", () => {
  const cards = [
    ace.of(suits.hearts).first(),
    ace.of(suits.spades).first(),
    king.of(suits.clubs),
    ten.of(suits.clubs),
    ace.of(suits.clubs),
    ten.of(suits.hearts),
    ten.of(suits.hearts),
    queen.of(suits.diamonds),
    ace.of(suits.diamonds),
    jack.of(suits.spades)
  ];
  const hand = new Hand(cards);

  expect(hand.hasBlankAce(suits.clubs)).toBe(false);
  expect(hand.hasBlankAce(suits.hearts)).toBe(true);
  expect(hand.hasBlankAce(suits.spades)).toBe(true);
  expect(hand.getBlankAces()).toEqual([
    ace.of(suits.spades).first(),
    ace.of(suits.hearts).first()
  ]);
});
