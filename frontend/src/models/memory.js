import { uniqueId } from "lodash-es";

/**
 * I would love some kind of interface here.
 * Interface.js seems to be a reasonable possibility.
 * Right now we'll stick to this.
 */

export class PercentageMemory {
  constructor(percent) {
    this.percent = percent;
    this.playedCards = [];
    this.id = uniqueId("memory_percent_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard) {
    if (Math.random() <= this.percent) this.playedCards.push(playedCard);
  }

  fehlSuitPlayedBefore(suit) {
    return (
      this.playedCards.filter(playedCard => playedCard.card.suit === suit)
        .length > 0
    );
  }

  pointsLeftInSuit(suit) {
    return (
      50 -
      this.playedCards
        .filter(playedCard => playedCard.card.suit === suit)
        .reduce((accu, playedCard) => accu + playedCard.card.value, 0)
    );
  }
}

export class PerfectMemory {
  constructor() {
    this.playedCards = [];
    this.id = uniqueId("memory_perfect_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard) {
    this.playedCards.push(playedCard);
  }

  fehlSuitPlayedBefore(suit) {
    return (
      this.playedCards.filter(playedCard => playedCard.card.suit === suit)
        .length > 0
    );
  }

  pointsLeftInSuit(suit) {
    return (
      50 -
      this.playedCards
        .filter(playedCard => playedCard.card.suit === suit)
        .reduce((accu, playedCard) => accu + playedCard.card.value, 0)
    );
  }
}

export class PriorityMemory {
  constructor() {
    this.playedCards = [];
    this.id = uniqueId("memory_priority_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard) {
    /*
    Opinion-biased function to take care of 'important' cards
    Will memorize all by value
    Queens, Tens, Aces
    */
    if ([3, 10, 11].includes(playedCard.card.value))
      this.playedCards.push(playedCard);
  }

  fehlSuitPlayedBefore(suit) {
    return (
      this.playedCards.filter(playedCard => playedCard.card.suit === suit)
        .length > 0
    );
  }

  pointsLeftInSuit(suit) {
    return (
      50 -
      this.playedCards
        .filter(playedCard => playedCard.card.suit === suit)
        .reduce((accu, playedCard) => accu + playedCard.card.value, 0)
    );
  }
}
