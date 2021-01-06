import { suits, ranks, compare } from "@/models/card";
import { find, without } from "lodash-es";
import { Card, jack } from "./card";

export class Hand {
  constructor(cards = []) {
    this.cards = cards;
    this.sort();
    this.isReParty = find(this.cards, { suit: suits.clubs, rank: ranks.queen });
  }

  isRe() {
    return !!this.isReParty;
  }

  isKontra() {
    return !this.isRe();
  }

  value() {
    return this.cards.reduce((acc, card) => acc + card.value, 0);
  }

  find(card) {
    return find(this.cards, card);
  }

  highest() {
    return this.cards[0];
  }

  remove(card) {
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
}
