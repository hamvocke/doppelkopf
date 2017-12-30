import { Game } from '@/models/game'
import { queen, suits } from '@/models/card'

const game = new Game()

test('new trick is empty', () => {
  expect(game.nextTrick().cards).toHaveLength(0)
})

test('can add card to trick', () => {
  const trick = game.nextTrick()
  const cardToBePlayed = queen.of(suits.spades)

  trick.add(cardToBePlayed, game.players[0])

  const expectedCard = {
    card: cardToBePlayed,
    playedBy: game.players[0].name
  }

  expect(trick.playedCards()).toEqual([expectedCard])
})

test('should finish a trick if four cards have been played', () => {
  const trick = game.nextTrick()

  trick.add(queen.of(suits.spades), game.players[0])
  trick.add(queen.of(suits.hearts), game.players[1])
  trick.add(queen.of(suits.clubs), game.players[2])
  trick.add(queen.of(suits.diamonds), game.players[3])

  expect(trick.isFinished()).toBeTruthy()
})

test('should find card played by player', () => {
  const trick = game.nextTrick()

  trick.add(queen.of(suits.spades), game.players[0])

  const expectedCard = {
    card: queen.of(suits.spades),
    playedBy: game.players[0].name
  }

  expect(trick.cardBy(game.players[0])).toEqual(expectedCard)
  expect(trick.cardBy(game.players[1])).toBeUndefined()
})
