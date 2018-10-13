import { Card, ranks, suits } from "@/models/card";
import { shuffle, flatten } from "lodash";

export class Deck {
  constructor() {
    this.cards = shuffle([].concat(...allCards));
  }
}

export const allCards = flatten(
  Object.values(ranks).map(rank => {
    return [
      new Card(rank, suits.clubs, 0),
      new Card(rank, suits.spades, 0),
      new Card(rank, suits.hearts, 0),
      new Card(rank, suits.diamonds, 0),
      new Card(rank, suits.clubs, 1),
      new Card(rank, suits.spades, 1),
      new Card(rank, suits.hearts, 1),
      new Card(rank, suits.diamonds, 1)
    ];
  })
);
