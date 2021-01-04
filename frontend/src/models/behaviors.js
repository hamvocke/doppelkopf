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

export class BasicRuleBasedBehaviour {
  cardToPlay(hand, baseCard) {
    if (!baseCard.isTrump()){
      return this.fehlRule(hand, baseCard);
    }
    return sample(playableCards(hand.cards, baseCard));
  }

  /*
    needs to know if own card is higher than highest in trick.
    Therefore we need to know the current trick
  */
  fehlRule(hand, baseCard){
    fehlCards = hand.cards.filter(card => card.suits === basecard.suits)
    if (fehlCards.length > 0){
      highestFehl = fehlcards[0]
      if (fehlCards.length > 0) {
        if (baseCard.value() < highestFehl.value() && highestFehl.value() === 11){
          return highestFehl;
        }else{
          return fehlcards.reverse()[0]
        }
      }
    }else{
      // play trump. usually use high-value cards
      trumpCards = hand.cards.filter(card => card.isTrump() === true)
      return sample(trumpCards)
    }
  }
}
