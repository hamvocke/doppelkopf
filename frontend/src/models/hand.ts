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

  isRe() {
    return this.isReParty;
  }

  isKontra() {
    return !this.isRe();
  }

  value() {
    return this.cards.reduce((acc, card) => acc + card.value, 0);
  }

  find(card: Card) {
    return find(this.cards, card);
  }

  findAny(suit: Suit, rank: Rank) {
    return find(this.cards, { suit, rank });
  }

  highest() {
    return this.cards[0];
  }

  remove(card: Card) {
    if (!this.find(card)) {
      throw new Error("can't remove card that isn't on hand");
    }

    this.cards = without(this.cards, card);
  }

  sort() {
    return this.cards.sort(compare).reverse();
  }

  isPlayable() {
    return (
      this.cards.filter(card => card.rank === Rank.King).length < 5 &&
      this.cards.filter(card => card.value >= 10).length < 7 &&
      this.highest().compareTo(jack.of(Suit.Diamonds)) < 0
    );
  }

  nonTrumps(suit?: Suit) {
    return suit
      ? this.cards.filter(card => card.suit === suit && !card.isTrump())
      : this.cards.filter(card => !card.isTrump());
  }

  lowValues() {
    return this.cards.filter(card => [values.J, values.K].includes(card.value));
  }

  hasNonTrumps(suit: Suit) {
    return this.nonTrumps(suit).length > 0;
  }

  trumps() {
    return this.cards.filter(card => card.isTrump());
  }

  hasTrumps() {
    return this.trumps().length > 0;
  }

  getBlankAce(suit: Suit) {
    let nonTrumpCards = this.nonTrumps(suit);
    return nonTrumpCards.length === 1 && nonTrumpCards[0].rank === Rank.Ace
      ? nonTrumpCards[0]
      : null;
  }

  hasBlankAce(suit: Suit) {
    return this.getBlankAce(suit) ? true : false;
  }

  getBlankAces() {
    let aces = new Array<Card>();
    [Suit.Clubs, Suit.Spades, Suit.Hearts].forEach(suit => {
      let ace = this.getBlankAce(suit);
      if (ace) aces.push(ace);
    });
    return aces;
  }
}
