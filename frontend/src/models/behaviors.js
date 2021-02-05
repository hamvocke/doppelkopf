import { sample } from "lodash-es";
import { playableCards } from "@/models/playableCardFinder";
import { chance } from "@/models/random";
import { Card, suits, ranks } from "./card";
import { Hand } from "./hand";

export class HighestCardBehavior {
  cardToPlay(hand, trick, memory) {
    return playableCards(hand.cards, trick.baseCard())[0];
  }
}

export class RandomCardBehavior {
  cardToPlay(hand, trick, memory) {
    return sample(playableCards(hand.cards, trick.baseCard()));
  }

  announcementToMake(possibleAnnouncements) {
    if (possibleAnnouncements.size === 0) {
      return null;
    }

    const announcementChance = 10;
    if (chance(announcementChance)) {
      return [...possibleAnnouncements][0];
    }

    return null;
  }
}

export class RuleBasedBehaviour {
  announcementToMake(possibleAnnouncements) {
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

  cardToPlay(hand, trick, memory) {
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

  startingRule(hand, memory) {
    for (const suit of [suits.clubs, suits.spades, suits.hearts]) {
      if (hand.hasBlankAce(suit) && !memory.nonTrumpSuitPlayedBefore(suit)) {
        return hand.nonTrumps(suit)[0];
      }
    }
    // ToDo check if we know with whom we play and if we want to play a strategy
    return sample(playableCards(hand.cards, null));
  }

  nonTrumpRule(hand, trick, memory) {
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

  playLowValueCard(hand) {
    if (hand.lowValues().length > 0) {
      let nonTrumpLows = new Hand(hand.nonTrumps()).lowValues();
      return nonTrumpLows.length > 0
        ? sample(playableCards(nonTrumpLows, null))
        : new Hand(hand.trumps()).lowValues().splice(-1)[0];
      //  : "brr";
    } else {
      return sample(playableCards(hand.cards, null));
    }
  }

  serveNonTrump(hand, trick, memory) {
    let nonTrumpCards = hand.nonTrumps(trick.baseCard().suit);
    let highest = nonTrumpCards[0];
    let lowest = nonTrumpCards.slice(-1)[0];

    if (memory.nonTrumpSuitPlayedBefore(trick.baseCard().suit, trick.id)) {
      return lowest;
    }

    if (
      highest.beats(trick.highestCard().card) &&
      highest.rank === ranks.ace &&
      // ToDo trick.expectedNumberOfCards needs to change as soon as 9er game is possible
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
  findMostValuableWinningTrump(hand, trick) {
    const highestCard = trick.highestCard().card;

    const aceOfDiamonds = hand.findAny(suits.diamonds, ranks.ace);
    const tenOfDiamonds = hand.findAny(suits.diamonds, ranks.ten);

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
