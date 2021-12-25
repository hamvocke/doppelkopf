import { Card, Rank, Suit } from "@/models/card";
import { randomInt } from "@/models/random";
export class Deck {
  cards: Card[];

  constructor() {
    this.cards = this.shuffle(new Array<Card>().concat(...allCards));
  }

  /**
   * Fisher-Yates shuffle. It's simple and we're dealing with 40 cards only.
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   */
  shuffle<T>(arr: T[]): T[] {
    const a = [...arr]; // copy, we want to keep it immutable

    for (let i = a.length - 1; i >= 1; i--) {
      let j = randomInt(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  }
}

export const allCards = Object.values(Rank)
  .map(rank => [
    new Card(rank, Suit.Clubs, 0),
    new Card(rank, Suit.Spades, 0),
    new Card(rank, Suit.Hearts, 0),
    new Card(rank, Suit.Diamonds, 0),
    new Card(rank, Suit.Clubs, 1),
    new Card(rank, Suit.Spades, 1),
    new Card(rank, Suit.Hearts, 1),
    new Card(rank, Suit.Diamonds, 1)
  ])
  .flat();
