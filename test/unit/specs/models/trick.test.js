import { Game } from '@/models/game'
import { PlayedCard } from '@/models/playedCard'
import { queen, jack, king, suits } from '@/models/card'

const game = new Game()

test('new trick is empty', () => {
  expect(game.nextTrick().cards).toHaveLength(0)
})

test('can add card to trick', () => {
  const trick = game.nextTrick()
  const cardToBePlayed = queen.of(suits.spades)

  trick.add(cardToBePlayed, game.players[0])

  const expectedCard = new PlayedCard(cardToBePlayed, game.players[0].name)

  expect(trick.cards()).toEqual([expectedCard])
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

  const expectedCard = new PlayedCard(queen.of(suits.spades), game.players[0].name)

  expect(trick.cardBy(game.players[0])).toEqual(expectedCard)
  expect(trick.cardBy(game.players[1])).toBeUndefined()
})

test('should prohibit multiple cards from same player', () => {
  const trick = game.nextTrick()

  function invalidMove () {
    trick.add(queen.of(suits.spades), game.players[0])
    trick.add(queen.of(suits.pikes), game.players[0])
  }

  expect(invalidMove).toThrowError('Player ' + game.players[0].name + ' already played a card')
})

test('should find base card of a trick', () => {
  const trick = game.nextTrick()

  trick.add(queen.of(suits.spades), game.players[0])
  trick.add(queen.of(suits.pikes), game.players[1])

  expect(trick.baseCard()).toEqual(queen.of(suits.spades))
})

test('should return undefined base card for empty trick', () => {
  const trick = game.nextTrick()

  expect(trick.baseCard()).toBeUndefined()
})

test('winner for an empty trick should be undefined', () => {
  const trick = game.nextTrick()

  expect(trick.winner()).toBeUndefined()
})

test('should find winner for a finished trick', () => {
  const trick = game.nextTrick()

  trick.add(queen.of(suits.hearts), game.players[3])
  trick.add(jack.of(suits.clubs), game.players[0])
  trick.add(king.of(suits.diamonds), game.players[1])
  trick.add(jack.of(suits.hearts), game.players[2])

  expect(trick.winner()).toEqual(game.players[3].name)
})

test('should find winner for an unfinished trick', () => {
  const trick = game.nextTrick()

  trick.add(queen.of(suits.spades), game.players[2])
  trick.add(queen.of(suits.diamonds), game.players[3])
  trick.add(queen.of(suits.clubs), game.players[0])

  expect(trick.winner()).toEqual(game.players[0].name)
})
