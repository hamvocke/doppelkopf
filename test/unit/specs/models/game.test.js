import { Game } from '@/models/game'

const defaultPlayers = ['Player 1', 'Player 2', 'Player 3', 'Player 4']

test('game has 4 players', () => {
  const game = new Game(defaultPlayers)
  expect(game.players[0].name).toBe('Player 1')
  expect(game.players[1].name).toBe('Player 2')
  expect(game.players[2].name).toBe('Player 3')
  expect(game.players[3].name).toBe('Player 4')
})

test('game has 1 human player', () => {
  const game = new Game(defaultPlayers)
  expect(game.players[0].isHuman).toBe(true)
  expect(game.players[1].isHuman).toBe(false)
  expect(game.players[2].isHuman).toBe(false)
  expect(game.players[3].isHuman).toBe(false)
})

test('game has a deck', () => {
  const game = new Game(defaultPlayers, [])
  expect(game.deck).toBeDefined()
})

test('game deals cards to each player', () => {
  const game = new Game(defaultPlayers)

  expect(game.players[0].hand.cards).toHaveLength(10)
  expect(game.players[1].hand.cards).toHaveLength(10)
  expect(game.players[2].hand.cards).toHaveLength(10)
  expect(game.players[3].hand.cards).toHaveLength(10)
})

test('game starts with an empty trick', () => {
  const game = new Game(defaultPlayers)

  expect(game.currentTrick).toBeDefined()
  expect(game.currentTrick.cards).toHaveLength(0)
})

test('should subscribe to trick', () => {
  const game = new Game(defaultPlayers)

  expect(game.currentTrick.subscribers).toEqual([game.finishTrick])
})
