import { sample } from "lodash-es";
import { playableCards } from "@/models/playableCardFinder";
import { chance } from "@/models/random";

export class HighestCardBehavior {
  cardToPlay(hand, baseCard) {
    return playableCards(hand.cards, baseCard)[0];
  }
}

export class RandomCardBehavior {
  cardToPlay(hand, baseCard) {
    return sample(playableCards(hand.cards, baseCard));
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
