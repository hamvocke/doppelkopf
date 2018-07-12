import { Game } from '@/models/game'
import { Notifier } from '@/models/notifier'
import { jack, suits } from '@/models/card'
import { re, kontra } from '@/models/parties'

const game = new Game()
let round = game.currentRound

test('round has 4 players', () => {
  expect(round.players).toHaveLength(4)
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

test('should autoplay for computer players', () => {
  const mockedComputerPlayer = round.players[1]
  mockedComputerPlayer.autoplay = jest.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)

  round.nextMove()

  expect(mockedComputerPlayer.autoplay.mock.calls.length).toBe(1)
})

test('should not autoplay for human players', () => {
  const mockedComputerPlayer = round.players[0]
  mockedComputerPlayer.autoplay = jest.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)

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

  test('should continue with first player after last', () => {
    expect(round.waitingForPlayer()).toBe(round.players[0])
  })

  test('should put player on top of player order if player wins a trick', () => {
    round.currentTrick.add(jack.of(suits.spades), round.players[2])
    round.currentTrick.add(jack.of(suits.clubs), round.players[3])
    round.currentTrick.add(jack.of(suits.diamonds), round.players[1])
    round.currentTrick.add(jack.of(suits.clubs), round.players[0])

    round.finishTrick()

    expect(round.waitingForPlayer()).toBe(round.players[3])
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
    round.finishRound()

    expect(round.isFinished).toBe(true)
  })

  test('should calculate score', () => {
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

    const score = round.calculateScore()

    expect(score.winner()).toEqual(kontra)
  })
})
