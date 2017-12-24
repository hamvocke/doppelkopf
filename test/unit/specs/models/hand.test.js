import { Hand } from '@/models/hand'
import { suits, ace, ten, king, queen, jack } from '@/models/card'
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
  hand.sort()

  const sortedHand = [
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

  expect(hand.cards).toEqual(sortedHand)
})
