import { Card, Suit, Rank, values, compare, jack } from "@/models/card";
import { find, without } from "lodash-es";

export class Hand {
  cards: Array<Card>;
  private isReParty: boolean;

  constructor(cards = new Array<Card>()) {
    this.cards = cards;
    this.sort();
    this.isReParty = !!find(this.cards, {
      suit: Suit.Clubs,
      rank: Rank.Queen
    });
  }

  isRe(): boolean {
    return this.isReParty;
  }

  isKontra(): boolean {
    return !this.isRe();
  }

  value(): number {
    return this.cards.reduce((acc, card) => acc + card.value, 0);
  }

  find(card: Card): Card | null {
    return find(this.cards, card) || null;
  }

  findAny(suit: Suit, rank: Rank): Card | null {
    return find(this.cards, { suit, rank }) || null;
  }

  contains(card: Card): Boolean {
    return !!this.findAny(card.suit, card.rank);
  }

  highest(): Card {
    return this.cards[0];
  }

  remove(card: Card) {
    if (!this.find(card)) {
      throw new Error("can't remove card that isn't on hand");
    }

    this.cards = without(this.cards, card);
  }

  sort() {
    this.cards = this.cards.sort(compare).reverse();
  }

  isPlayable(): boolean {
    return (
      this.cards.filter(card => card.rank === Rank.King).length < 5 &&
      this.cards.filter(card => card.value >= 10).length < 7 &&
      this.highest().compareTo(jack.of(Suit.Diamonds)) < 0 &&
      // ToDo remove last line as soon as poverty is playable
      this.trumps().length > 3
    );
  }

  nonTrumps(suit?: Suit): Card[] {
    return suit
      ? this.cards.filter(card => card.suit === suit && !card.isTrump())
      : this.cards.filter(card => !card.isTrump());
  }

  lowValues(): Card[] {
    return this.cards.filter(card =>
      [values.J, values.K, values.Q].includes(card.value)
    );
  }

  trumps(): Card[] {
    return this.cards.filter(card => card.isTrump());
  }

  getBlankAces(): Card[] {
    let aces = new Array<Card>();
    [Suit.Clubs, Suit.Spades, Suit.Hearts].forEach(suit => {
      let ace = this.getBlankAce(suit);
      if (ace) aces.push(ace);
    });
    return aces;
  }

  private getBlankAce(suit: Suit): Card | undefined {
    const nonTrumpCards = this.nonTrumps(suit);

    if (nonTrumpCards.length > 1) {
      return undefined;
    }

    return nonTrumpCards.find(c => c.rank === Rank.Ace);
  }

  getMissingSuites(): Suit[] {
    let suits = new Array<Suit>();
    [Suit.Clubs, Suit.Spades, Suit.Hearts].forEach(suit => {
      if (this.nonTrumps(suit).length === 0) suits.push(suit);
    });
    return suits;
  }
}
