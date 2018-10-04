import { some, findIndex, uniqueId } from "lodash";

export const suits = {
  clubs: "♣",
  diamonds: "♦",
  hearts: "♥",
  spades: "♠"
};

export const ranks = {
  ace: "A",
  ten: "10",
  king: "K",
  queen: "Q",
  jack: "J"
};

export const values = {
  A: 11,
  "10": 10,
  K: 4,
  Q: 3,
  J: 2
};

export class Card {
  constructor(rank, suit = suits[0], id = uniqueId("card_")) {
    this.rank = rank;
    this.suit = suit;
    this.id = id;
  }

  get value() {
    return values[this.rank];
  }

  get cardId() {
    return `${this.rank}-${this.suit}-${this.id}`;
  }

  of(suit) {
    return new Card(this.rank, suit);
  }

  first() {
    return new Card(this.rank, this.suit, 0);
  }

  second() {
    return new Card(this.rank, this.suit, 1);
  }

  isTrump() {
    return some(trumps, { rank: this.rank, suit: this.suit });
  }

  beats(anotherCard) {
    const thisIsTrump = this.isTrump();
    const otherCardIsTrump = anotherCard.isTrump();

    if (thisIsTrump && !otherCardIsTrump) {
      return true;
    }

    if (!thisIsTrump && otherCardIsTrump) {
      return false;
    }

    if (thisIsTrump && otherCardIsTrump) {
      return (
        findIndex(trumps, { rank: anotherCard.rank, suit: anotherCard.suit }) -
          findIndex(trumps, { rank: this.rank, suit: this.suit }) >=
        0
      );
    }

    if (!thisIsTrump && !otherCardIsTrump) {
      if (this.suit === anotherCard.suit) {
        return this.value - anotherCard.value >= 0;
      }
    }

    return false;
  }
}

export function compare(oneCard, anotherCard) {
  return findIndex(cardOrder, anotherCard) - findIndex(cardOrder, oneCard);
}

export const ace = new Card(ranks.ace, suits.clubs);
export const ten = new Card(ranks.ten, suits.clubs);
export const king = new Card(ranks.king, suits.clubs);
export const queen = new Card(ranks.queen, suits.clubs);
export const jack = new Card(ranks.jack, suits.clubs);

const trumps = [
  ten.of(suits.hearts),
  queen.of(suits.clubs),
  queen.of(suits.spades),
  queen.of(suits.hearts),
  queen.of(suits.diamonds),
  jack.of(suits.clubs),
  jack.of(suits.spades),
  jack.of(suits.hearts),
  jack.of(suits.diamonds),
  ace.of(suits.diamonds),
  ten.of(suits.diamonds),
  king.of(suits.diamonds)
];

const cardOrder = [
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
