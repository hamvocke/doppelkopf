import Hand from '@/models/hand'
import { suites, ace, ten, king, queen, jack } from '@/models/card'
import { Deck, allCards } from '@/models/deck'
import { shuffle } from 'lodash'

test('a hand with queen of clubs is re', () => {
    const cards = [
        queen.of(suites.clubs)
    ]
    const hand = new Hand(cards)

    expect(hand.isRe()).toBeTruthy()
    expect(hand.isKontra()).toBeFalsy()
})

test('a hand without queen of clubs is kontra', () => {
    const cards = [
        queen.of(suites.spades)
    ]
    const hand = new Hand(cards)

    expect(hand.isKontra()).toBeTruthy()
    expect(hand.isRe()).toBeFalsy()
})

test('hand has a value', () => {
    const cards = [
        queen.of(suites.spades),
        ten.of(suites.hearts),
        ace.of(suites.diamonds)
    ]
    const hand = new Hand(cards)

    expect(hand.value()).toBe(24)
})

test('empty hand has a value of 0', () => {
    const hand = new Hand([])

    expect(hand.value()).toBe(0)
})

test('can find card on hand', () => {
    const cards = [queen.of(suites.spades)]
    const hand = new Hand(cards)

    expect(hand.find(cards[0])).toEqual(queen.of(suites.spades))
})

test('can not find non-existing card on hand', () => {
    const cards = [queen.of(suites.spades)]
    const hand = new Hand(cards)

    expect(hand.find(king.of(suites.spades))).toBeUndefined()
})

test('can remove card from hand', () => {
    const cards = [queen.of(suites.spades)]
    const hand = new Hand(cards)
    expect(hand.find(cards[0])).toBeDefined()

    hand.remove(cards[0])

    expect(hand.find(cards[0])).toBeUndefined()
})

test('cannot remove non-existing card from hand', () => {
    const cards = [queen.of(suites.spades)]
    const hand = new Hand(cards)
    expect(hand.find(cards[0])).toBeDefined()

    function invalidRemove() {
        hand.remove(king.of(suites.diamonds))
    }

    expect(invalidRemove).toThrowError('can\'t remove card that isn\'t on hand')
})

test('should sort hand by visual order', () => {
    const cards = allCards

    const hand = new Hand(shuffle(cards))
    hand.sort()

    const sortedHand = [
        ten.of(suites.hearts),
        queen.of(suites.clubs),
        queen.of(suites.spades),
        queen.of(suites.hearts),
        queen.of(suites.diamonds),
        jack.of(suites.clubs),
        jack.of(suites.spades),
        jack.of(suites.hearts),
        jack.of(suites.diamonds),
        ace.of(suites.diamonds),
        ten.of(suites.diamonds),
        king.of(suites.diamonds),
        ace.of(suites.clubs),
        ten.of(suites.clubs),
        king.of(suites.clubs),
        ace.of(suites.spades),
        ten.of(suites.spades),
        king.of(suites.spades),
        ace.of(suites.hearts),
        king.of(suites.hearts),
    ]

    expect(hand.cards).toEqual(sortedHand)
})
