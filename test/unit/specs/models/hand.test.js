import { Hand } from '@/models/hand'
import { Card, ranks, suits, ace, ten, king, queen } from '@/models/card'
import { allCards } from '@/models/deck'
import { shuffle } from 'lodash'

test('a hand with queen of clubs is re', () => {
  const cards = [
    queen.of(suits.clubs)
  ]
  const hand = new Hand(cards)

  expect(hand.isRe()).toBeTruthy()
  expect(hand.isKontra()).toBeFalsy()
})

test('a hand without queen of clubs is kontra', () => {
  const cards = [
    queen.of(suits.spades)
  ]
  const hand = new Hand(cards)

  expect(hand.isKontra()).toBeTruthy()
  expect(hand.isRe()).toBeFalsy()
})

test('hand has a value', () => {
  const cards = [
    queen.of(suits.spades),
    ten.of(suits.hearts),
    ace.of(suits.diamonds)
  ]
  const hand = new Hand(cards)

  expect(hand.value()).toBe(24)
})

test('empty hand has a value of 0', () => {
  const hand = new Hand([])

  expect(hand.value()).toBe(0)
})

test('can find card on hand', () => {
  const cards = [queen.of(suits.spades)]
  const hand = new Hand(cards)

  expect(hand.find(cards[0])).toEqual(queen.of(suits.spades))
})

test('can not find non-existing card on hand', () => {
  const cards = [queen.of(suits.spades)]
  const hand = new Hand(cards)

  expect(hand.find(king.of(suits.spades))).toBeUndefined()
})

test('can remove card from hand', () => {
  const cards = [queen.of(suits.spades)]
  const hand = new Hand(cards)
  expect(hand.find(cards[0])).toBeDefined()

  hand.remove(cards[0])

  expect(hand.find(cards[0])).toBeUndefined()
})

test('cannot remove non-existing card from hand', () => {
  const cards = [queen.of(suits.spades)]
  const hand = new Hand(cards)
  expect(hand.find(cards[0])).toBeDefined()

  function invalidRemove () {
    hand.remove(king.of(suits.diamonds))
  }

  expect(invalidRemove).toThrowError('can\'t remove card that isn\'t on hand')
})

test('should sort hand by visual order', () => {
  const cards = allCards

  const hand = new Hand(shuffle(cards))

  const sortedDeck = [
    new Card(ranks.ten, suits.hearts, 0),
    new Card(ranks.ten, suits.hearts, 1),

    new Card(ranks.queen, suits.clubs, 0),
    new Card(ranks.queen, suits.clubs, 1),
    new Card(ranks.queen, suits.spades, 0),
    new Card(ranks.queen, suits.spades, 1),
    new Card(ranks.queen, suits.hearts, 0),
    new Card(ranks.queen, suits.hearts, 1),
    new Card(ranks.queen, suits.diamonds, 0),
    new Card(ranks.queen, suits.diamonds, 1),

    new Card(ranks.jack, suits.clubs, 0),
    new Card(ranks.jack, suits.clubs, 1),
    new Card(ranks.jack, suits.spades, 0),
    new Card(ranks.jack, suits.spades, 1),
    new Card(ranks.jack, suits.hearts, 0),
    new Card(ranks.jack, suits.hearts, 1),
    new Card(ranks.jack, suits.diamonds, 0),
    new Card(ranks.jack, suits.diamonds, 1),

    new Card(ranks.ace, suits.diamonds, 0),
    new Card(ranks.ace, suits.diamonds, 1),
    new Card(ranks.ten, suits.diamonds, 0),
    new Card(ranks.ten, suits.diamonds, 1),
    new Card(ranks.king, suits.diamonds, 0),
    new Card(ranks.king, suits.diamonds, 1),

    new Card(ranks.ace, suits.clubs, 0),
    new Card(ranks.ace, suits.clubs, 1),
    new Card(ranks.ten, suits.clubs, 0),
    new Card(ranks.ten, suits.clubs, 1),
    new Card(ranks.king, suits.clubs, 0),
    new Card(ranks.king, suits.clubs, 1),

    new Card(ranks.ace, suits.spades, 0),
    new Card(ranks.ace, suits.spades, 1),
    new Card(ranks.ten, suits.spades, 0),
    new Card(ranks.ten, suits.spades, 1),
    new Card(ranks.king, suits.spades, 0),
    new Card(ranks.king, suits.spades, 1),

    new Card(ranks.ace, suits.hearts, 0),
    new Card(ranks.ace, suits.hearts, 1),
    new Card(ranks.king, suits.hearts, 0),
    new Card(ranks.king, suits.hearts, 1)
  ]

  expect(hand.cards).toEqual(sortedDeck)
})
