import { queen, suits, compare } from '@/models/card'
import { find, pull } from 'lodash'

export class Hand {
  constructor (cards = []) {
    this.cards = cards
  }

  isRe () {
    return find(this.cards, queen.of(suits.clubs))
  }

  isKontra () {
    return !this.isRe()
  }

  value () {
    return this.cards
        .map(card => card.value)
        .reduce((acc, value) => acc + value, 0)
  }

  find (card) {
    return find(this.cards, card)
  }

  remove (card) {
    if (!this.find(card)) {
      throw new Error('can\'t remove card that isn\'t on hand')
    }

    pull(this.cards, card)
  }

  sort () {
    return new Hand(this.cards.sort(compare).reverse())
  }
}
