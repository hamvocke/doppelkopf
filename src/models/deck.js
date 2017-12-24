import { Card, ranks, suits } from '@/models/card'
import { shuffle, flatten } from 'lodash'

export class Deck {
  constructor () {
    this.cards = shuffle([]
        .concat(...allCards)
        .concat(...allCards))
  }
}

export const allCards = flatten(Object.values(ranks).map(rank => {
  return [
    new Card(suits.clubs, rank),
    new Card(suits.spades, rank),
    new Card(suits.hearts, rank),
    new Card(suits.diamonds, rank)
  ]
}))
