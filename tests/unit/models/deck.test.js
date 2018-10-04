import { Deck } from '@/models/deck'
import { Card, ranks, suits } from '@/models/card'
import isEqual from 'lodash/isEqual'

test('deck has 40 cards', () => {
  const deck = new Deck()
  expect(deck.cards).toHaveLength(40)
})

test('deck has two aces of diamonds', () => {
  const deck = new Deck()

  const firstAce = new Card(ranks.ace, suits.diamonds, 0)
  const secondAce = new Card(ranks.ace, suits.diamonds, 1)
  expect(deck.cards.filter(card => isEqual(card, firstAce))).toHaveLength(1)
  expect(deck.cards.filter(card => isEqual(card, secondAce))).toHaveLength(1)
})

test('deck is shuffled', () => {
  const oneDeck = new Deck()
  const anotherDeck = new Deck()

  expect(oneDeck.cards).not.toHaveSameOrderAs(anotherDeck.cards)
})

expect.extend({
  toHaveSameOrderAs (received, expected) {
    if (received.length !== expected.length) {
      return {
        message: () => (
          `expected ${received} and ${expected} to have same length`
        ),
        pass: false
      }
    }

    for (let i = 0; i <= expected.length; i++) {
      if (received[i] !== expected[i]) {
        return {
          message: () => (
            `Found different value at position ${i}\n
                        ${this.utils.printExpected(expected)}\n
                        ${this.utils.printReceived(received)}
                        `
          ),
          pass: false
        }
      }
    }

    return {
      message: () => (
        `expected ${received} and ${expected} to have same order\n
                ${this.utils.printExpected(expected)}\n
                ${this.utils.printReceived(received)}`
      ),
      pass: true
    }
  }
})
