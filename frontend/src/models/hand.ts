import { Card, suits, ranks, compare, jack } from "@/models/card";
import { find, without } from "lodash-es";

export class Hand {
  cards: Array<Card>;
  private isReParty: boolean;

  constructor(cards = []) {
    this.cards = cards;
    this.sort();
    this.isReParty = !!find(this.cards, {
      suit: suits.clubs,
      rank: ranks.queen
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

  findAny(suit: string, rank: string) {
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
      this.cards.filter(card => card.rank === ranks.king).length < 5 &&
      this.cards.filter(card => card.value >= 10).length < 7 &&
      this.highest().compareTo(jack.of(suits.diamonds)) < 0
    );
  }

  nonTrumps(suit: string) {
    return this.cards.filter(card => card.suit === suit && !card.isTrump());
  }

  hasNonTrumps(suit: string) {
    return this.nonTrumps(suit).length > 0;
  }

  trumps() {
    return this.cards.filter(card => card.isTrump());
  }

  hasTrumps() {
    return this.trumps().length > 0;
  }

  getBlankAce(suit: string) {
    let nonTrumpCards = this.nonTrumps(suit);
    return nonTrumpCards.length === 1 && nonTrumpCards[0].rank === ranks.ace
      ? nonTrumpCards[0]
      : null;
  }

  hasBlankAce(suit: string) {
    return this.getBlankAce(suit) ? true : false;
  }

  getBlankAces() {
    let aces = new Array<Card>();
    [suits.clubs, suits.spades, suits.hearts].forEach(suit => {
      let ace = this.getBlankAce(suit);
      if (ace) aces.push(ace);
    });
    return aces;
    //this.cards.filter(card => !card.isTrump() && card.value === 11);
  }
}
