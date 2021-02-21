import { some, findIndex, uniqueId } from "lodash-es";

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

export const values: { [id: string]: number } = {
  A: 11,
  "10": 10,
  K: 4,
  Q: 3,
  J: 2
};

export class Card {
  id: number | string;
  rank: string;
  suit: string;

  // TODO: use enums for rank, suit
  constructor(
    rank: string,
    suit = suits.clubs,
    id: number | string = uniqueId("card_")
  ) {
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

  of(suit: string) {
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

  /**
   * Explains why this card is a trump card
   * @return {string} the explanation, if trump, or an empty string otherwise
   */
  whyTrump() {
    if (this.rank === ranks.queen) {
      return "queens are always trump";
    }

    if (this.rank === ranks.jack) {
      return "jacks are always trump";
    }

    if (this.suit === suits.diamonds) {
      return "diamonds are always trump";
    }

    if (this.rank === ranks.ten && this.suit === suits.hearts) {
      return "the ten of hearts is always trump";
    }

    return "";
  }

  beats(anotherCard: Card) {
    return this.compareTo(anotherCard) < 0;
  }

  compareTo(anotherCard: Card) {
    const thisIsTrump = this.isTrump();
    const otherCardIsTrump = anotherCard.isTrump();

    if (thisIsTrump && !otherCardIsTrump) {
      return -1;
    }

    if (!thisIsTrump && otherCardIsTrump) {
      return 1;
    }

    if (thisIsTrump && otherCardIsTrump) {
      return (
        findIndex(trumps, { rank: this.rank, suit: this.suit }) -
        findIndex(trumps, { rank: anotherCard.rank, suit: anotherCard.suit })
      );
    }

    if (!thisIsTrump && !otherCardIsTrump) {
      if (this.suit === anotherCard.suit) {
        return anotherCard.value - this.value;
      }
    }

    return 0;
  }
}

export function compare(oneCard: Card, anotherCard: Card) {
  return findIndex(cardOrder, anotherCard) - findIndex(cardOrder, oneCard);
}

export const ace = new Card(ranks.ace, suits.clubs);
export const ten = new Card(ranks.ten, suits.clubs);
export const king = new Card(ranks.king, suits.clubs);
export const queen = new Card(ranks.queen, suits.clubs);
export const jack = new Card(ranks.jack, suits.clubs);

export const trumps = [
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

export const cardOrder = [
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
