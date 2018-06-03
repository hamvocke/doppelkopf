import { Game } from '@/models/game'
import { Notifier } from '@/models/notifier'
import { jack, suits } from '@/models/card'

let game

beforeEach(() => {
  game = new Game()
})

test('game has 4 players', () => {
  expect(game.players[0].name).toBe('Player 1')
  expect(game.players[1].name).toBe('Player 2')
  expect(game.players[2].name).toBe('Player 3')
  expect(game.players[3].name).toBe('Player 4')
})

test('game has 1 human player', () => {
  expect(game.players[0].isHuman).toBe(true)
  expect(game.players[1].isHuman).toBe(false)
  expect(game.players[2].isHuman).toBe(false)
  expect(game.players[3].isHuman).toBe(false)
})

test('game has a deck', () => {
  expect(game.deck).toBeDefined()
})

test('game deals cards to each player', () => {
  expect(game.players[0].hand.cards).toHaveLength(10)
  expect(game.players[1].hand.cards).toHaveLength(10)
  expect(game.players[2].hand.cards).toHaveLength(10)
  expect(game.players[3].hand.cards).toHaveLength(10)
})

test('game starts with an empty trick', () => {
  expect(game.currentTrick).toBeDefined()
})

test('game starts with an empty scorecard', () => {
  expect(game.scorecard).toBeDefined()
})

test('should give current trick to winner', () => {
  game.currentTrick.add(jack.of(suits.spades), game.players[2])
  game.currentTrick.add(jack.of(suits.hearts), game.players[3])
  game.currentTrick.add(jack.of(suits.diamonds), game.players[1])
  game.currentTrick.add(jack.of(suits.clubs), game.players[0])

  game.finishTrick()

  expect(game.players[0].trickStack.tricks).toHaveLength(1)
})

test('should autoplay for computer players', () => {
  const mockedComputerPlayer = game.players[1]
  mockedComputerPlayer.autoplay = jest.fn()
  game.playerOrder.prioritize(mockedComputerPlayer)

  game.nextMove()

  expect(mockedComputerPlayer.autoplay.mock.calls.length).toBe(1)
})

test('should not autoplay for human players', () => {
  const mockedComputerPlayer = game.players[0]
  mockedComputerPlayer.autoplay = jest.fn()
  game.playerOrder.prioritize(mockedComputerPlayer)

  game.nextMove()

  expect(mockedComputerPlayer.autoplay.mock.calls.length).toBe(0)
})

test('should show notification when triggering next move for human player', () => {
  let notifier = new Notifier()
  notifier.messages = []
  const mockedComputerPlayer = game.players[0]
  mockedComputerPlayer.autoplay = jest.fn()
  game.playerOrder.prioritize(mockedComputerPlayer)

  expect(notifier.messages).toHaveLength(0)

  game.nextMove()

  expect(notifier.messages).toHaveLength(1)
})

describe('player order', () => {
  beforeEach(() => {
    game = new Game()
  })

  test('should start with human player', () => {
    expect(game.waitingForPlayer()).toBe(game.players[0])
  })

  test('should continue with first player after last', () => {
    expect(game.waitingForPlayer()).toBe(game.players[0])
  })

  test('should put player on top of player order if player wins a trick', () => {
    game.currentTrick.add(jack.of(suits.spades), game.players[2])
    game.currentTrick.add(jack.of(suits.clubs), game.players[3])
    game.currentTrick.add(jack.of(suits.diamonds), game.players[1])
    game.currentTrick.add(jack.of(suits.clubs), game.players[0])

    game.finishTrick()

    expect(game.waitingForPlayer()).toBe(game.players[3])
  })

  test('should change active player on next move', () => {
    const playFirstCardBehavior = {
      cardToPlay: (hand) => hand.cards[0]
    }
    game.playerOrder.prioritize(game.players[3])
    game.players[3].behavior = playFirstCardBehavior

    game.nextMove()

    expect(game.waitingForPlayer()).toBe(game.players[0])
  })
})
