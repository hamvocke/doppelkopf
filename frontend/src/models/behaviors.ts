import { sample } from "lodash-es";
import { playableCards } from "@/models/playableCardFinder";
import { chance } from "@/models/random";
import { Card, Suit, Rank } from "@/models/card";
import { Hand } from "@/models/hand";
import { Announcement } from "./announcements";

export interface Behavior {
  cardToPlay(hand: Hand, trick: any, memory: any): Card | undefined;
  announcementToMake(
    possibleAnnouncements: Set<Announcement>
  ): Announcement | null;
}

export class HighestCardBehavior implements Behavior {
  cardToPlay(hand: Hand, trick: any, memory: any) {
    return playableCards(hand.cards, trick.baseCard())[0];
  }

  announcementToMake(possibleAnnouncements: Set<Announcement>) {
    return null;
  }
}
export class RandomCardBehavior implements Behavior {
  cardToPlay(hand: Hand, trick: any, memory: any) {
    return sample(playableCards(hand.cards, trick.baseCard()));
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

  cardToPlay(hand: Hand, trick: any, memory: any) {
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
    return sample(playableCards(hand.cards, baseCard));
  }

  startingRule(hand: Hand, memory: any) {
    for (const suit of [Suit.Clubs, Suit.Spades, Suit.Hearts]) {
      if (hand.hasBlankAce(suit) && !memory.nonTrumpSuitPlayedBefore(suit)) {
        return hand.nonTrumps(suit)[0];
      }
    }
    // ToDo check if we know with whom we play and if we want to play a strategy
    return sample(playableCards(hand.cards));
  }

  nonTrumpRule(hand: Hand, trick: any, memory: any) {
    let baseCard = trick.baseCard();
    if (hand.hasNonTrumps(baseCard.suit)) {
      return this.serveNonTrump(hand, trick, memory);
    } else {
      if (memory.nonTrumpSuitPlayedBefore(baseCard.suit, trick.id)) {
        return hand.highest().beats(trick.highestCard().card) &&
          memory.pointsLeftInSuit(baseCard.suit) + trick.points() >= 10
          ? hand.trumps()[0]
          : this.playLowValueCard(hand);
      } else {
        let usefulTrump = this.findMostValuableWinningTrump(hand, trick);
        return usefulTrump ?? this.playLowValueCard(hand);
      }
    }
  }

  playLowValueCard(hand: Hand) {
    if (hand.lowValues().length > 0) {
      let nonTrumpLows = new Hand(hand.nonTrumps()).lowValues();
      return nonTrumpLows.length > 0
        ? sample(playableCards(nonTrumpLows))
        : new Hand(hand.trumps()).lowValues().splice(-1)[0];
      //  : "brr";
    } else {
      return sample(playableCards(hand.cards));
    }
  }

  serveNonTrump(hand: Hand, trick: any, memory: any) {
    let nonTrumpCards = hand.nonTrumps(trick.baseCard().suit);
    let highest = nonTrumpCards[0];
    let lowest = nonTrumpCards.slice(-1)[0];

    if (memory.nonTrumpSuitPlayedBefore(trick.baseCard().suit, trick.id)) {
      return lowest;
    }

    if (
      highest.beats(trick.highestCard().card) &&
      highest.rank === Rank.Ace &&
      // TODO trick.expectedNumberOfCards needs to change as soon as 9er game is possible
      nonTrumpCards.length < trick.expectedNumberOfCards
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
  findMostValuableWinningTrump(hand: Hand, trick: any): Card | null {
    const highestCard = trick.highestCard().card;

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
}
