import { Card, ranks, suits } from "@/models/card";
import { shuffle, flatten } from "lodash-es";

export class Deck {
  cards: Array<Card>;

  constructor() {
    this.cards = shuffle(new Array<Card>().concat(...allCards));
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
