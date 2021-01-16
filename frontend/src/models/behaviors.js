import { sample } from "lodash-es";
import { playableCards } from "@/models/playableCardFinder";
import { chance } from "@/models/random";
import { suits } from "./card";

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
      /** We need to serve a non-trump card */
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
      let nonTrumpCards = hand.nonTrumps(baseCard.suit);
      let highest = nonTrumpCards[0];
      let lowest = nonTrumpCards.slice(-1)[0];

      if (memory.nonTrumpSuitPlayedBefore(baseCard.suit)) {
        return lowest;
      } else {
        if (
          trick.highestCard().card.value < highest.value &&
          highest.value === 11 &&
          nonTrumpCards.length < 4
        ) {
          return highest;
        } else {
          return lowest;
        }
      }
    } else {
      let hUtils = new HandUtils(hand);
      let usefulTrump = hUtils.getUsefulTrumpFornonTrumpTrick(trick);
      return usefulTrump
        ? usefulTrump
        : sample(playableCards(hand.cards, undefined));
    }
  }
}

/**
 * This class contains biased opinions, therefore it's not part of hand
 */
export class HandUtils {
  constructor(hand) {
    this.hand = hand;
  }

  getUsefulTrumpFornonTrumpTrick(trick) {
    /**
     * In case ace or other high card is already lying,
     * we still want to win the trick if possible
     */
    let sortedList = this.getUsefulTrumpListFornonTrumpTrick();
    for (let index = 0; index < sortedList.length; index++) {
      if (trick.highestCard().card.compareTo(sortedList[index]) > 0)
        return sortedList[index];
    }
  }

  getUsefulTrumpListFornonTrumpTrick() {
    /**
     * We want to build a good good trump order and return the best card
     * [Fox, ten of diamonds, Jack of diamonds ... ten of hearts]
     */
    let trumpOrder = [];
    trumpOrder = trumpOrder.concat(
      this.hand.cards.filter(
        card => card.suit === suits.diamonds && card.value > 10
      )
    );
    trumpOrder = trumpOrder.concat(
      this.hand.cards
        .filter(card => card.isTrump() && card.value !== 4)
        .reverse()
    );
    return trumpOrder;
  }
}
