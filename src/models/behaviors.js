import { random } from 'lodash'
import { playableCards } from '@/models/playableCardFinder'

export class HighestCardBehavior {
  cardToPlay (hand, baseCard) {
    return playableCards(hand.cards, baseCard)[0]
  }
}

export class RandomCardBehavior {
  cardToPlay (hand, baseCard) {
    const cardsPlayable = playableCards(hand.cards, baseCard)
    const randomCardIndex = random(0, cardsPlayable.length - 1)
    return cardsPlayable[randomCardIndex]
  }
}
