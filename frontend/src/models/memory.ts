import { uniqueId } from "lodash-es";
import { chance } from "@/models/random";
import { PlayedCard } from "@/models/playedCard";
import { Suit } from "@/models/card";

export interface Memory {
  playedCards: MemorizedCard[];
  clearMemory(): void;
  memorize(playedCard: PlayedCard, trickId?: string): void;
  nonTrumpSuitPlayedBefore(suit: string): boolean;
  pointsLeftInSuit(suit: string): number;
}

interface MemorizedCard {
  playedCard: PlayedCard;
  trickId?: string;
}

// TODO: pretty sure we can get rid of id here
export class PercentageMemory implements Memory {
  percentage: number;
  playedCards: MemorizedCard[];
  id: string;

  constructor(percentage: number) {
    this.percentage = percentage;
    this.playedCards = [];
    this.id = uniqueId("memory_percent_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard: PlayedCard, trickId?: string) {
    if (chance(this.percentage)) this.playedCards.push({ playedCard, trickId });
  }

  nonTrumpSuitPlayedBefore(suit: Suit, trickId?: string) {
    return (
      this.playedCards.filter(
        element =>
          element.playedCard.card.suit === suit &&
          !element.playedCard.card.isTrump() &&
          (element.trickId !== trickId || trickId === null)
      ).length > 0
    );
  }

  pointsLeftInSuit(suit: string) {
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

export class PerfectMemory implements Memory {
  playedCards: MemorizedCard[];
  id: string;

  constructor() {
    this.playedCards = [];
    this.id = uniqueId("memory_perfect_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard: PlayedCard, trickId?: string) {
    this.playedCards.push({ playedCard, trickId });
  }

  nonTrumpSuitPlayedBefore(suit: Suit, trickId?: string) {
    return (
      this.playedCards.filter(
        element =>
          element.playedCard.card.suit === suit &&
          !element.playedCard.card.isTrump() &&
          (element.trickId !== trickId || !trickId)
      ).length > 0
    );
  }

  pointsLeftInSuit(suit: string) {
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
  playedCards: MemorizedCard[];
  id: string;

  constructor() {
    this.playedCards = [];
    this.id = uniqueId("memory_priority_");
  }

  clearMemory() {
    this.playedCards = [];
  }

  memorize(playedCard: PlayedCard, trickId?: string) {
    /*
    Opinion-biased function to take care of 'important' cards
    Will memorize all by value
    Queens, Tens, Aces
    */
    if ([3, 10, 11].includes(playedCard.card.value))
      this.playedCards.push({ playedCard, trickId });
  }

  nonTrumpSuitPlayedBefore(suit: Suit, trickId?: number) {
    return (
      this.playedCards.filter(
        element =>
          element.playedCard.card.suit === suit &&
          !element.playedCard.card.isTrump() &&
          (element.trickId !== trickId || trickId === null)
      ).length > 0
    );
  }

  pointsLeftInSuit(suit: string) {
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
