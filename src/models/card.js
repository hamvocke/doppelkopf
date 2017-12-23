import { some, findIndex } from 'lodash'

export const suits = {
  clubs: '♣',
  diamonds: '♦',
  hearts: '♥',
  spades: '♠'
}

export const ranks = {
  ace: 'A',
  ten: '10',
  king: 'K',
  queen: 'Q',
  jack: 'J'
}

export const values = {
  'A': 11,
  '10': 10,
  'K': 4,
  'Q': 3,
  'J': 2
}

export class Card {
  constructor (suit = suits[0], rank) {
    this.suit = suit
    this.rank = rank
  }

  get value () {
    return values[this.rank]
  }

  of (suit) {
    return new Card(suit, this.rank)
  }

  isTrump () {
    return some(trumps, this)
  }

  toString () {
    return `${this.rank}${this.suit}`
  }

  beats (anotherCard) {
    const thisIsTrump = this.isTrump()
    const otherCardIsTrump = anotherCard.isTrump()

    if (thisIsTrump && !otherCardIsTrump) {
      return true
    }

    if (!thisIsTrump && otherCardIsTrump) {
      return false
    }

    if (thisIsTrump && otherCardIsTrump) {
      return findIndex(trumps, anotherCard) - findIndex(trumps, this) >= 0
    }

    if (!thisIsTrump && !otherCardIsTrump) {
      if (this.suit === anotherCard.suit) {
        return this.value - anotherCard.value >= 0
      }
    }

    return false
  }
}

export function compare (oneCard, anotherCard) {
  return findIndex(cardOrder, anotherCard) - findIndex(cardOrder, oneCard)
}

export const ace = new Card(suits.clubs, ranks.ace)
export const ten = new Card(suits.clubs, ranks.ten)
export const king = new Card(suits.clubs, ranks.king)
export const queen = new Card(suits.clubs, ranks.queen)
export const jack = new Card(suits.clubs, ranks.jack)

const trumps = [
  ten.of(suits.hearts),
  queen.of(suits.clubs),
  queen.of(suits.spades),
  queen.of(suits.hearts),
  queen.of(suits.diamonds),
  jack.of(suits.clubs),
  jack.of(suits.spades),
  jack.of(suits.hearts),
  jack.of(suits.diamonds),
  ace.of(suits.diamonds),
  ten.of(suits.diamonds),
  king.of(suits.diamonds)
]

const cardOrder = [
  ten.of(suits.hearts),
  queen.of(suits.clubs),
  queen.of(suits.spades),
  queen.of(suits.hearts),
  queen.of(suits.diamonds),
  jack.of(suits.clubs),
  jack.of(suits.spades),
  jack.of(suits.hearts),
  jack.of(suits.diamonds),
  ace.of(suits.diamonds),
  ten.of(suits.diamonds),
  king.of(suits.diamonds),
  ace.of(suits.clubs),
  ten.of(suits.clubs),
  king.of(suits.clubs),
  ace.of(suits.spades),
  ten.of(suits.spades),
  king.of(suits.spades),
  ace.of(suits.hearts),
  king.of(suits.hearts)
]
