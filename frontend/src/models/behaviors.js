import { sample } from "lodash-es";
import { playableCards } from "@/models/playableCardFinder";

export class HighestCardBehavior {
  cardToPlay(hand, baseCard) {
    return playableCards(hand.cards, baseCard)[0];
  }
}

export class RandomCardBehavior {
  cardToPlay(hand, baseCard) {
    return sample(playableCards(hand.cards, baseCard));
  }
}
