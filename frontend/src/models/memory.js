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

  memorize(playedCard, trickId = null) {
    if (Math.random() <= this.percent)
      this.playedCards.push({ playedCard, trickId });
  }

  nonTrumpSuitPlayedBefore(suit, trickId = null) {
    return (
      this.playedCards.filter(
        element =>
          element.playedCard.card.suit === suit &&
          !element.playedCard.card.isTrump() &&
          (element.trickId !== trickId || trickId === null)
      ).length > 0
    );
  }

  pointsLeftInSuit(suit) {
    return (
      50 -
      this.playedCards
        .filter(
          element =>
            element.playedCard.card.suit === suit &&
            !element.playedCard.card.isTrump()
        )
        .reduce((accu, element) => accu + element.playedCard.card.value, 0)
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

  memorize(playedCard, trickId = null) {
    this.playedCards.push({ playedCard, trickId });
  }

  nonTrumpSuitPlayedBefore(suit, trickId = null) {
    return (
      this.playedCards.filter(
        element =>
          element.playedCard.card.suit === suit &&
          !element.playedCard.card.isTrump() &&
          (element.trickId !== trickId || trickId === null)
      ).length > 0
    );
  }

  pointsLeftInSuit(suit) {
    return (
      50 -
      this.playedCards
        .filter(
          element =>
            element.playedCard.card.suit === suit &&
            !element.playedCard.card.isTrump()
        )
        .reduce((accu, element) => accu + element.playedCard.card.value, 0)
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

  memorize(playedCard, trickId) {
    /*
    Opinion-biased function to take care of 'important' cards
    Will memorize all by value
    Queens, Tens, Aces
    */
    if ([3, 10, 11].includes(playedCard.card.value))
      this.playedCards.push({ playedCard, trickId });
  }

  nonTrumpSuitPlayedBefore(suit, trickId = null) {
    return (
      this.playedCards.filter(
        element =>
          element.playedCard.card.suit === suit &&
          !element.playedCard.card.isTrump() &&
          (element.trickId !== trickId || trickId === null)
      ).length > 0
    );
  }

  pointsLeftInSuit(suit) {
    return (
      50 -
      this.playedCards
        .filter(
          element =>
            element.playedCard.card.suit === suit &&
            !element.playedCard.card.isTrump()
        )
        .reduce((accu, element) => accu + element.playedCard.card.value, 0)
    );
  }
}
