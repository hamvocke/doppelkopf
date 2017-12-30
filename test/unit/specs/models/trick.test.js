import { Game } from '@/models/game'
import { queen, suits } from '@/models/card'

const game = new Game()

test('new trick is empty', () => {
  expect(game.nextTrick().cards).toHaveLength(0)
})

test('can add card to trick', () => {
  const trick = game.nextTrick()
  const cardToBePlayed = queen.of(suits.spades)

  trick.add(cardToBePlayed)

  expect(trick.cards).toContain(cardToBePlayed)
})

test('can add card to trick', () => {
  const trick = game.nextTrick()
  const cardToBePlayed = queen.of(suits.spades)

  trick.add(cardToBePlayed)

  expect(trick.cards).toContain(cardToBePlayed)
})

test('should finish a trick if four cards have been played', () => {
  const trick = game.nextTrick()

  trick.add(queen.of(suits.spades))
  trick.add(queen.of(suits.hearts))
  trick.add(queen.of(suits.clubs))
  trick.add(queen.of(suits.diamonds))

  expect(trick.isFinished()).toBeTruthy()
})
