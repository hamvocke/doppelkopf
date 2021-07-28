import { sample } from "lodash-es";
import { playableCards } from "@/models/playableCardFinder";
import { chance } from "@/models/random";
import { Card, Suit, Rank } from "@/models/card";
import { Hand } from "@/models/hand";
import { Announcement } from "./announcements";
import { Trick } from "./trick";
import { Memory } from "./memory";

export interface Behavior {
  playerId: string;
  cardToPlay(hand: Hand, trick: Trick, memory?: Memory): Card;
  announcementToMake(
    possibleAnnouncements: Set<Announcement>
  ): Announcement | null;
}

export class HighestCardBehavior implements Behavior {
  constructor(public playerId: string) {}
  cardToPlay(hand: Hand, trick: Trick, memory?: Memory) {
    return playableCards(hand.cards, trick.baseCard())[0];
  }

  announcementToMake(possibleAnnouncements: Set<Announcement>) {
    return null;
  }
}
export class RandomCardBehavior implements Behavior {
  constructor(public playerId: string) {}
  cardToPlay(hand: Hand, trick: Trick, memory?: Memory) {
    return sample(playableCards(hand.cards, trick.baseCard()))!;
  }

  announcementToMake(possibleAnnouncements: Set<Announcement>) {
    if (possibleAnnouncements.size === 0) {
      return null;
    }

    const announcementChance = 0.1;
    if (chance(announcementChance)) {
      return [...possibleAnnouncements][0];
    }

    return null;
  }
}

export class RuleBasedBehaviour implements Behavior {
  constructor(public playerId: string) {}
  announcementToMake(possibleAnnouncements: Set<Announcement>) {
    // ToDo announce by "goodies"
    /**
     * for instance
     * only one nonTrumpsuit
     * high number of trumps
     * high trumps, such as 2x ten of hearts
     * blank ace and starting
     */
    return null;
  }

  cardToPlay(hand: Hand, trick: Trick, memory?: Memory): Card {
    let baseCard = trick.baseCard();
    if (!baseCard) {
      /** It's our turn. Decide how to deal with cards */
      return this.startingRule(hand, memory);
    }
    if (!baseCard.isTrump()) {
      return this.nonTrumpRule(hand, trick, memory);
    }
    // ToDo how to play if not starting or mustn't serve nonTrump
    // i'm thinking of something working with expectation value
    return sample(playableCards(hand.cards, baseCard))!;
  }

  startingRule(hand: Hand, memory?: Memory): Card {
    for (const suit of [Suit.Clubs, Suit.Spades, Suit.Hearts]) {
      if (hand.hasBlankAce(suit) && !memory?.nonTrumpSuitPlayedBefore(suit)) {
        return hand.nonTrumps(suit)[0];
      }
    }
    // ToDo check if we know with whom we play and if we want to play a strategy
    return sample(playableCards(hand.cards))!;
  }

  nonTrumpRule(hand: Hand, trick: Trick, memory?: Memory): Card {
    let baseCard = trick.baseCard();
    if (hand.hasNonTrumps(baseCard!.suit)) {
      return this.serveNonTrump(hand, trick, memory);
    } else {
      if (trick.cards().length == 3) {
        return this.playPosition(hand, trick);
      }
      if (memory?.nonTrumpSuitPlayedBefore(baseCard!.suit, trick.id!)) {
        return hand.highest().beats(trick.highestCard()!.card) &&
          // ToDo this check works but needs tuning
          memory.pointsLeftInSuit(baseCard!.suit) + trick.points() >= 14
          ? hand.trumps()[0]
          : this.playLowValueCard(hand, trick);
      } else {
        let usefulTrump = this.findMostValuableWinningTrump(hand, trick);
        return usefulTrump ?? this.playLowValueCard(hand, trick);
      }
    }
  }

  playLowValueCard(hand: Hand, trick: Trick): Card {
    if (playableCards(hand.lowValues(), trick.baseCard()).length > 0) {
      let nonTrumpLows = new Hand(hand.nonTrumps()).lowValues();
      return nonTrumpLows.length > 0
        ? sample(playableCards(nonTrumpLows, trick.baseCard()))!
        : new Hand(hand.trumps()).lowValues().splice(-1)[0];
    } else {
      return sample(playableCards(hand.cards, trick.baseCard()))!;
    }
  }

  playPosition(hand: Hand, trick: Trick): Card {
    let winningTrump = this.findMostValuableWinningTrump(hand, trick);
    return trick.points() >= 14 && winningTrump
      ? winningTrump
      : this.playLowValueCard(hand);
  }

  serveNonTrump(hand: Hand, trick: Trick, memory?: Memory): Card {
    let nonTrumpCards = hand.nonTrumps(trick.baseCard()!.suit);
    let highest = nonTrumpCards[0];
    let lowest = nonTrumpCards.slice(-1)[0];

    if (memory?.nonTrumpSuitPlayedBefore(trick.baseCard()!.suit, trick.id)) {
      return lowest;
    }

    if (
      highest.beats(trick.highestCard()!.card) &&
      highest.rank === Rank.Ace &&
      // TODO trick.expectedNumberOfCards needs to change as soon as 9er game is possible
      nonTrumpCards.length < trick.players.length
    ) {
      return highest;
    }

    return lowest;
  }

  /**
   * Find a trump on a given hand that will win the given trick at this point in time.
   * Will prefer high-value trumps (ace of diamonds, ten of diamonds) if possible.
   * Otherwise it will fall back to the lowest trump possible.
   * @param {Hand} hand - The hand to find the trump on
   * @param {Trick} trick - The trick that should be trumped
   * @returns {Card} - The most valuable trump card or null if no winning trump can be found
   */
  findMostValuableWinningTrump(hand: Hand, trick: Trick): Card | null {
    const highestCard = trick.highestCard()!.card;

    const aceOfDiamonds = hand.findAny(Suit.Diamonds, Rank.Ace);
    const tenOfDiamonds = hand.findAny(Suit.Diamonds, Rank.Ten);

    const trumpPreference = [
      aceOfDiamonds,
      tenOfDiamonds,
      ...hand.trumps().reverse()
    ];

    return (
      trumpPreference.find(card => card && card.beats(highestCard)) ?? null
    );
  }

  /**
   * Find a card on a given hand that will add as less value as possible.
   * Will prefer jacks before tens and aces.
   * @param {Hand} hand - The hand to find the trump on
   * @param {Trick} trick - The trick that should be trumped
   * @returns {Card} - The least valuable card that can be found
   */
  findLeastValuableLosingCard(hand: Hand, trick: Trick): Card {
    const cardPreference = [
      ...hand.nonTrumps().filter(card => card.value === 4),
      ...hand.lowValues().filter(card => card.value !== 3),
      ...hand.cards.reverse()
    ];
    return playableCards(cardPreference, trick.baseCard())[0];
  }
}
