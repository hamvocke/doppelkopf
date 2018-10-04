import { HighestCardBehavior, RandomCardBehavior } from '@/models/behaviors'
import { Hand } from '@/models/hand'
import { ace, king, queen, jack, suits, ten, Card } from '@/models/card'

describe('Highest Card Behavior', () => {
  const behavior = new HighestCardBehavior()
  const hand = new Hand([
    ace.of(suits.hearts).first(),
    jack.of(suits.clubs).first(),
    queen.of(suits.spades).second(),
    king.of(suits.hearts).first()
  ])

  test('should play highest possible card', () => {
    const cardToPlay = behavior.cardToPlay(hand, ten.of(suits.diamonds))
    expect(cardToPlay).toEqual(queen.of(suits.spades).second())
  })
})

describe('Random Card Behavior', () => {
  const behavior = new RandomCardBehavior()
  const hand = new Hand([
    ace.of(suits.hearts).first(),
    jack.of(suits.clubs).first(),
    queen.of(suits.spades).second(),
    king.of(suits.hearts).first()
  ])

  test('should play a random card', () => {
    const cardToPlay = behavior.cardToPlay(hand, ten.of(suits.diamonds))
    expect(cardToPlay).toEqual(expect.any(Card))
  })
})
