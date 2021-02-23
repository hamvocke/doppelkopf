import { Card, Rank, Suit } from "@/models/card";
import { shuffle, flatten } from "lodash-es";

export class Deck {
  cards: Card[];

  constructor() {
    this.cards = shuffle(new Array<Card>().concat(...allCards));
  }
}

export const allCards = flatten(
  Object.values(Rank).map(rank => {
    return [
      new Card(rank, Suit.Clubs, 0),
      new Card(rank, Suit.Spades, 0),
      new Card(rank, Suit.Hearts, 0),
      new Card(rank, Suit.Diamonds, 0),
      new Card(rank, Suit.Clubs, 1),
      new Card(rank, Suit.Spades, 1),
      new Card(rank, Suit.Hearts, 1),
      new Card(rank, Suit.Diamonds, 1)
    ];
  })
);
