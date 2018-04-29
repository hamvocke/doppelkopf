import { suits, ranks, compare } from '@/models/card'
import { find, without } from 'lodash'

export class Hand {
  constructor (cards = []) {
    this.cards = cards
    this.sort()
    this.isReParty = find(this.cards, {suit: suits.clubs, rank: ranks.queen})
  }

  isRe () {
    return this.isReParty
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

    this.cards = without(this.cards, card)
  }

  sort () {
    return this.cards.sort(compare).reverse()
  }
}
