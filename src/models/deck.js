import { Card, values, ranks, suites } from '@/models/card'
import { shuffle, flatten } from 'lodash'

export class Deck {
  constructor () {
    this.cards = shuffle([]
        .concat(...allCards)
        .concat(...allCards))
  }

  get value () {
    return values[this.rank]
  }
}

export const allCards = flatten(Object.values(ranks).map(rank => {
  return [
    new Card(suites.clubs, rank),
    new Card(suites.spades, rank),
    new Card(suites.hearts, rank),
    new Card(suites.diamonds, rank)
  ]
}))
