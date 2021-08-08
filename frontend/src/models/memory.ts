import { uniqueId } from "lodash-es";
import { chance } from "@/models/random";
import { PlayedCard } from "@/models/playedCard";
import { Card, cardOrder, compare, Suit } from "@/models/card";

interface MemorizedCard {
  playedCard: PlayedCard;
  trickId?: string;
}

export abstract class Memory {
  id: string;
  memorizedCards: MemorizedCard[];

  constructor() {
    this.id = uniqueId("memory_");
    this.memorizedCards = [];
  }

  isHighestCardLeft(card: Card): boolean {
    let leftOverCards = cardOrder.filter(
      x =>
        !this.memorizedCards
          .map(mcard => mcard.playedCard.card)
          .some(y => x.compareTo(y) == 0)
    );
    return card.compareTo(leftOverCards[0]) <= 0;
  }

  clearMemory() {
    this.memorizedCards = [];
  }

  abstract memorize(playedCard: PlayedCard, trickId?: string): void;

  nonTrumpSuitPlayedBefore(suit: Suit, trickId?: string) {
    return (
      this.memorizedCards.filter(
        element =>
          element.playedCard.card.suit === suit &&
          !element.playedCard.card.isTrump() &&
          (element.trickId !== trickId || !trickId)
      ).length > 0
    );
  }

  pointsLeftInSuit(suit: string) {
    return (
      // ToDo check if this causes issues when suit is heart
      // 50 is points for non-trump suit. hearts is only 30.
      50 -
      this.memorizedCards
        .filter(
          element =>
            element.playedCard.card.suit === suit &&
            !element.playedCard.card.isTrump()
        )
        .reduce((accu, element) => accu + element.playedCard.card.value, 0)
    );
  }
}

// TODO: pretty sure we can get rid of id here
export class PercentageMemory extends Memory {
  percentage: number;

  constructor(percentage: number) {
    super();
    this.id = uniqueId("memory_percent_");
    this.percentage = percentage;
  }

  /**
   * Will memorize the card by the percentage set in the constructor
   * @param {PlayedCard} playedCard - The card and the player who has played it
   * @param {string} trickId - The trick Identifier the card was played in
   */
  memorize(playedCard: PlayedCard, trickId?: string) {
    if (chance(this.percentage))
      this.memorizedCards.push({ playedCard, trickId });
  }
}

export class PerfectMemory extends Memory {
  constructor() {
    super();
    this.id = uniqueId("memory_perfect_");
  }

  /**
   * Will memorize all cards
   * @param {PlayedCard} playedCard - The card and the player who has played it
   * @param {string} trickId - The trick Identifier the card was played in
   */
  memorize(playedCard: PlayedCard, trickId?: string) {
    this.memorizedCards.push({ playedCard, trickId });
  }
}

export class PriorityMemory extends Memory {
  constructor() {
    super();
    this.id = uniqueId("memory_priority_");
  }

  /**
   * Opinionated function to memorize 'important' cards.
   * Will memorize by value. Only memorizes Queens, Tens, Aces
   * @param {PlayedCard} playedCard - The card and the player who has played it
   * @param {string} trickId - The trick Identifier the card was played in
   */
  memorize(playedCard: PlayedCard, trickId?: string) {
    if ([3, 10, 11].includes(playedCard.card.value))
      this.memorizedCards.push({ playedCard, trickId });
  }
}
