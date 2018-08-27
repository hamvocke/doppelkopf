import { Game } from '@/models/game'
import { Notifier } from '@/models/notifier'
import { jack, suits } from '@/models/card'
import { re, kontra } from '@/models/parties'

const game = new Game()
let round = game.currentRound

test('round has 4 players', () => {
  expect(round.players).toHaveLength(4)
})

test('should know its game', () => {
  expect(round.game).toBe(game)
})

test('game starts with an empty trick', () => {
  expect(round.currentTrick).toBeDefined()
})

test('should give current trick to winner', () => {
  round.currentTrick.add(jack.of(suits.spades), round.players[2])
  round.currentTrick.add(jack.of(suits.hearts), round.players[3])
  round.currentTrick.add(jack.of(suits.diamonds), round.players[1])
  round.currentTrick.add(jack.of(suits.clubs), round.players[0])

  round.finishTrick()

  expect(round.players[0].trickStack.tricks).toHaveLength(1)
})

test('should trigger next move when finishing trick', () => {
  round.game.autoplay = true

  round.players[1].autoplay = jest.fn()
  round.currentTrick.add(jack.of(suits.clubs), round.players[1])
  round.currentTrick.add(jack.of(suits.spades), round.players[2])
  round.currentTrick.add(jack.of(suits.hearts), round.players[3])
  round.currentTrick.add(jack.of(suits.diamonds), round.players[0])

  round.finishTrick()

  expect(round.players[1].autoplay.mock.calls.length).toBe(1)
})

test('should autoplay for computer players', () => {
  const mockedComputerPlayer = round.players[1]
  mockedComputerPlayer.autoplay = jest.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)

  round.nextMove()

  expect(mockedComputerPlayer.autoplay.mock.calls.length).toBe(1)
})

test('should not autoplay for human players', () => {
  const mockedHumanPlayer = round.players[0]
  mockedHumanPlayer.autoplay = jest.fn()
  round.playerOrder.prioritize(mockedHumanPlayer)

  round.nextMove()

  expect(mockedHumanPlayer.autoplay.mock.calls.length).toBe(0)
})

test('should not autoplay if trick is finished', () => {
  const mockedComputerPlayer = round.players[1]
  mockedComputerPlayer.autoplay = jest.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)
  round.currentTrick.finished = true

  round.nextMove()

  expect(mockedComputerPlayer.autoplay.mock.calls.length).toBe(0)
})

test('should return players for each party', () => {
  round.players[0].isRe = () => true
  round.players[1].isRe = () => false
  round.players[2].isRe = () => true
  round.players[3].isRe = () => false

  const parties = round.findParties()

  const expectedParties = {
    [re]: [
      round.players[0],
      round.players[2]],
    [kontra]: [
      round.players[1],
      round.players[3]]
  }

  expect(parties).toEqual(expectedParties)
})

test('should show notification when triggering next move for human player', () => {
  let notifier = new Notifier()
  notifier.messages = []
  const mockedComputerPlayer = round.players[0]
  mockedComputerPlayer.autoplay = jest.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)

  expect(notifier.messages).toHaveLength(0)

  round.nextMove()

  expect(notifier.messages).toHaveLength(1)
})

describe('player order', () => {
  beforeEach(() => {
    round = new Game().currentRound
  })

  test('should start with human player', () => {
    expect(round.waitingForPlayer()).toBe(round.players[0])
  })

  test('should put player on top of player order if player wins a trick', () => {
    round.currentTrick.add(jack.of(suits.spades), round.players[2])
    round.currentTrick.add(jack.of(suits.clubs), round.players[3])
    round.currentTrick.add(jack.of(suits.diamonds), round.players[1])
    round.currentTrick.add(jack.of(suits.clubs), round.players[0])

    round.finishTrick()

    expect(round.waitingForPlayer().name).toBe(round.players[3].name)
  })

  test('should change active player on next move', () => {
    const playFirstCardBehavior = {
      cardToPlay: (hand) => hand.cards[0]
    }
    round.playerOrder.prioritize(round.players[3])
    round.players[3].behavior = playFirstCardBehavior

    round.nextMove()

    expect(round.waitingForPlayer()).toBe(round.players[0])
  })
})

describe('finish round', () => {
  beforeEach(() => {
    round = new Game().currentRound
  })

  test('should not mark fresh round as finished', () => {
    expect(round.isFinished).toBe(false)
  })

  test('should mark finished round as finished', () => {
    setupGameKontraWins()

    round.finishRound()

    expect(round.isFinished).toBe(true)
  })

  test('should throw error when finishing a finished round', () => {
    setupGameKontraWins()

    round.finishRound()

    function finishFinishedRound () {
      round.finishRound()
    }

    expect(finishFinishedRound).toThrowError(`Can't finish a round that's already finished`)
  })

  test('should calculate score', () => {
    setupGameKontraWins()

    const score = round.calculateScore()

    expect(score.winner()).toEqual(kontra)
  })

  test('should add score to scorecard', () => {
    setupGameKontraWins()

    round.finishRound()

    const scorecard = round.game.scorecard

    expect(scorecard.scoreFor(round.players[0])).toBe(-1)
    expect(scorecard.scoreFor(round.players[1])).toBe(-1)
    expect(scorecard.scoreFor(round.players[2])).toBe(1)
    expect(scorecard.scoreFor(round.players[3])).toBe(1)
  })
})

function setupGameKontraWins () {
  const firstTrickStack = { points: () => 63 }
  const secondTrickStack = { points: () => 56 }
  const thirdTrickStack = { points: () => 64 }
  const fourthTrickStack = { points: () => 57 }

  round.players[0].isRe = () => true
  round.players[1].isRe = () => true
  round.players[2].isRe = () => false
  round.players[3].isRe = () => false

  round.players[0].trickStack = firstTrickStack
  round.players[1].trickStack = secondTrickStack
  round.players[2].trickStack = thirdTrickStack
  round.players[3].trickStack = fourthTrickStack
}
