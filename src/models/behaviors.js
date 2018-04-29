import { playableCards } from '@/models/playableCardFinder'

export class HighestCardBehavior {
  cardToPlay (hand, baseCard) {
    return playableCards(hand.cards, baseCard)[0]
  }
}
