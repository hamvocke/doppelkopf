import { Trick } from '@/models/trick'
import { queen, suits } from '@/models/card'

test('new trick is empty', () => {
  expect(new Trick().cards).toHaveLength(0)
})

test('can add card to trick', () => {
  const trick = new Trick()
  const cardToBePlayed = queen.of(suits.spades)

  trick.add(cardToBePlayed)

  expect(trick.cards).toContain(cardToBePlayed)
})

test('should finish a trick if four cards have been played', () => {
  const trick = new Trick()

  trick.add(queen.of(suits.spades))
  trick.add(queen.of(suits.hearts))
  trick.add(queen.of(suits.clubs))
  trick.add(queen.of(suits.diamonds))

  expect(trick.isFinished).toBeTruthy()
})
