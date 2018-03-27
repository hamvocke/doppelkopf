import { HighestCardBehavior } from '@/models/behaviors'
import { Hand } from '@/models/hand'
import { ace, king, queen, jack, suits, ten } from '@/models/card'

describe('Highest Card Behavior', () => {
  const behavior = new HighestCardBehavior()
  const hand = new Hand([
    ace.of(suits.hearts).first(),
    jack.of(suits.clubs).first(),
    queen.of(suits.spades).second(),
    king.of(suits.hearts).first()
  ])

  test('should play highest possible card', () =>
    expect(behavior.cardToPlay(hand, ten.of(suits.diamonds))).toEqual(queen.of(suits.spades).second())
  )
})
