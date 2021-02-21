import { uniqueId } from "lodash-es";
import { PlayedCard } from "@/models/playedCard";

export interface Memory {
  playedCards: Array<PlayedCard>;

  clearMemory(): void;
  memorize(playedCard: PlayedCard): void;
  nonTrumpSuitPlayedBefore(suit: string): boolean;
  pointsLeftInSuit(suit: string): number;
}

// TODO: pretty sure we can get rid of id here
export class PercentageMemory implements Memory {
  percentage: number;
  playedCards: Array<PlayedCard>;
  id: string;

  constructor(percentage: number) {
    this.percentage = percentage;
    this.playedCards = [];
    this.id = uniqueId("memory_percent_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard: PlayedCard) {
    if (Math.random() <= this.percentage) this.playedCards.push(playedCard);
  }

  nonTrumpSuitPlayedBefore(suit: string) {
    return (
      this.playedCards.filter(playedCard => playedCard.card.suit === suit)
        .length > 0
    );
  }

  pointsLeftInSuit(suit: string) {
    return (
      50 -
      this.playedCards
        .filter(playedCard => playedCard.card.suit === suit)
        .reduce((accu, playedCard) => accu + playedCard.card.value, 0)
    );
  }
}

export class PerfectMemory implements Memory {
  playedCards: Array<PlayedCard>;
  id: string;

  constructor() {
    this.playedCards = [];
    this.id = uniqueId("memory_perfect_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard: PlayedCard) {
    this.playedCards.push(playedCard);
  }

  nonTrumpSuitPlayedBefore(suit: string) {
    return (
      this.playedCards.filter(playedCard => playedCard.card.suit === suit)
        .length > 0
    );
  }

  pointsLeftInSuit(suit: string) {
    return (
      50 -
      this.playedCards
        .filter(playedCard => playedCard.card.suit === suit)
        .reduce((accu, playedCard) => accu + playedCard.card.value, 0)
    );
  }
}

export class PriorityMemory {
  playedCards: Array<PlayedCard>;
  id: string;

  constructor() {
    this.playedCards = [];
    this.id = uniqueId("memory_priority_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard: PlayedCard) {
    /*
    Opinion-biased function to take care of 'important' cards
    Will memorize all by value
    Queens, Tens, Aces
    */
    if ([3, 10, 11].includes(playedCard.card.value))
      this.playedCards.push(playedCard);
  }

  nonTrumpSuitPlayedBefore(suit: string) {
    return (
      this.playedCards.filter(playedCard => playedCard.card.suit === suit)
        .length > 0
    );
  }

  pointsLeftInSuit(suit: string) {
    return (
      50 -
      this.playedCards
        .filter(playedCard => playedCard.card.suit === suit)
        .reduce((accu, playedCard) => accu + playedCard.card.value, 0)
    );
  }
}
