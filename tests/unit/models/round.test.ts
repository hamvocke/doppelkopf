import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Game } from '@/models/game'
import { Round, RoundState } from '@/models/round'
import { notifier } from '@/models/notifier'
import { jack, Suit, ace } from '@/models/card'
import { options } from '@/models/options'
import { Hand } from '@/models/hand'
import { TrickStack } from '@/models/trickStack'
import { Trick } from '@/models/trick'
import type { Extra } from '@/models/extras'
import { Affinities } from '@/models/affinities'
import { Reservation } from '@/models/reservations'

const game = Game.singlePlayer()
let round = game.currentRound
let players = round.playerOrder.asList()

vi.useFakeTimers()

beforeEach(() => {
  options.autoplay = false
  vi.runAllTimers()
})

test('round has 4 players', () => {
  expect(players).toHaveLength(4)
})

test('should know the scorecard', () => {
  expect(round.scorecard).toBe(game.scorecard)
})

describe('start round', () => {
  beforeEach(() => {
    round = Game.singlePlayer().currentRound
    players = round.playerOrder.asList()
  })

  test("should set round to 'started'", () => {
    round.roundState = RoundState.AskingForReservations

    players[0].declareReservation(Reservation.Healthy)
    round.startRound()

    expect(round.roundState).toEqual(RoundState.Started)
  })

  test('should set game type', () => {
    round.roundState = RoundState.AskingForReservations

    players[0].declareReservation(Reservation.Healthy)
    players[1].declareReservation(Reservation.Healthy)
    players[2].declareReservation(Reservation.AceSolo)
    players[3].declareReservation(Reservation.Healthy)
    round.startRound()

    expect(round.gameType?.reservation).toEqual(Reservation.AceSolo)
    expect(round.gameType?.player).toEqual(players[2])
  })
})

test('game starts with an empty trick', () => {
  expect(round.currentTrick).toBeDefined()
})

test('should give current trick to winner', async () => {
  expect.assertions(1)
  round.currentTrick.add(jack.of(Suit.Spades), players[2])
  round.currentTrick.add(jack.of(Suit.Hearts), players[3])
  round.currentTrick.add(jack.of(Suit.Diamonds), players[1])
  round.currentTrick.add(jack.of(Suit.Clubs), players[0])

  await round.finishTrick()
  vi.runAllTimers()

  expect(players[0].trickStack.tricks).toHaveLength(1)
})

test('should trigger next move when finishing trick', async () => {
  expect.assertions(1)
  options.autoplay = true

  players[1].autoplay = vi.fn()
  round.currentTrick.add(jack.of(Suit.Clubs), players[1])
  round.currentTrick.add(jack.of(Suit.Spades), players[2])
  round.currentTrick.add(jack.of(Suit.Hearts), players[3])
  round.currentTrick.add(jack.of(Suit.Diamonds), players[0])

  await round.finishTrick()
  vi.runAllTimers()

  expect(players[1].autoplay).toBeCalled()
})

test('should autoplay for computer players', async () => {
  const mockedComputerPlayer = players[1]
  mockedComputerPlayer.autoplay = vi.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)

  await round.nextMove()

  expect(mockedComputerPlayer.autoplay).toBeCalled()
})

test('should not autoplay for human players', async () => {
  const mockedHumanPlayer = players[0]
  mockedHumanPlayer.autoplay = vi.fn()
  round.playerOrder.prioritize(mockedHumanPlayer)

  await round.nextMove()

  expect(mockedHumanPlayer.autoplay).not.toBeCalled()
})

test('should not autoplay if trick is finished', async () => {
  const mockedComputerPlayer = players[1]
  mockedComputerPlayer.autoplay = vi.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)
  round.currentTrick.finished = true

  await round.nextMove()

  expect(mockedComputerPlayer.autoplay).not.toBeCalled()
})

test('should not autoplay if round is finished', async () => {
  const mockedComputerPlayer = players[1]
  mockedComputerPlayer.autoplay = vi.fn()
  round.playerOrder.prioritize(mockedComputerPlayer)
  round.currentTrick.finished = false
  round.roundState = RoundState.Finished

  await round.nextMove()

  expect(mockedComputerPlayer.autoplay).not.toBeCalled()
})

test('should show extras as flash message', async () => {
  expect.assertions(1)
  round.currentTrick.add(ace.of(Suit.Clubs), players[1])
  round.currentTrick.add(ace.of(Suit.Spades), players[2])
  round.currentTrick.add(ace.of(Suit.Hearts), players[3])
  round.currentTrick.add(ace.of(Suit.Diamonds), players[0])

  notifier.flash = vi.fn()

  await round.finishTrick()
  vi.runAllTimers()

  expect(notifier.flash).toHaveBeenCalled()
})

describe('player order', () => {
  beforeEach(() => {
    round = Game.singlePlayer().currentRound
    players = round.playerOrder.asList()
  })

  test('should start with given player', () => {
    round = new Round(game.players, game.scorecard, game.players[2])
    players = round.playerOrder.asList()
    expect(round.waitingForPlayer().id).toBe(players[2].id)
  })

  test('should put player on top of player order if player wins a trick', async () => {
    expect.assertions(1)
    round.currentTrick.add(jack.of(Suit.Spades), players[2])
    round.currentTrick.add(jack.of(Suit.Clubs), players[3])
    round.currentTrick.add(jack.of(Suit.Diamonds), players[1])
    round.currentTrick.add(jack.of(Suit.Clubs), players[0])

    await round.finishTrick()
    vi.runAllTimers()

    expect(round.waitingForPlayer().id).toEqual(players[3].id)
  })

  test('should change active player on next move', async () => {
    const playFirstCardBehavior = {
      playerId: 'p4',
      affinities: new Affinities(players[3]),
      reset: vi.fn(() => null),
      cardToPlay: (hand: Hand) => hand.cards[0],
      announcementToMake: vi.fn(() => null),
      handleAffinityEvent: vi.fn(() => null),
      reservationToDeclare: () => Reservation.Healthy,
    }
    round.playerOrder.prioritize(players[3])
    players[3].behavior = playFirstCardBehavior

    await round.nextMove()

    expect(round.waitingForPlayer()).toBe(players[0])
  })
})

describe('finish round', () => {
  beforeEach(() => {
    round = Game.singlePlayer().currentRound
    players = round.playerOrder.asList()
  })

  test('should be able to finish round if players have no more cards on hand', () => {
    expect(round.noMoreCardsLeft()).toBe(false)

    setupNoCardsLeft()

    expect(round.noMoreCardsLeft()).toBe(true)
  })

  test('should not be able to finish round if player has card left on hand', () => {
    players[0].hand.cards = []
    players[1].hand.cards = []
    players[2].hand.cards = []
    players[3].hand.cards = [jack.of(Suit.Hearts)]

    expect(round.noMoreCardsLeft()).toBe(false)
  })

  test('should add score to scorecard', async () => {
    expect.assertions(4)
    setupGameKontraWins()

    await round.finishRound()
    vi.runAllTimers()

    const scorecard = round.scorecard
    expect(scorecard.totalPointsFor(players[0])).toBe(-2)
    expect(scorecard.totalPointsFor(players[1])).toBe(-2)
    expect(scorecard.totalPointsFor(players[2])).toBe(2)
    expect(scorecard.totalPointsFor(players[3])).toBe(2)
  })

  test('should mark round as finished', async () => {
    expect.assertions(2)
    expect(round.isFinished()).toBe(false)

    setupGameKontraWins()

    await round.finishRound()
    vi.runAllTimers()

    expect(round.isFinished()).toBe(true)
  })

  test('should finish trick when finishing round', async () => {
    expect.assertions(2)
    setupGameKontraWins()
    expect(round.currentTrick.cards()).toHaveLength(4)

    await round.finishRound()
    vi.runAllTimers()

    expect(round.currentTrick.cards()).toHaveLength(0)
  })

  test('should throw exception if round is not yet finished', async () => {
    expect.assertions(1)
    players[0].hand.cards = [jack.of(Suit.Hearts)]

    await expect(round.finishRound()).rejects.toThrow(
      `Can't finish a round before all cards have been played`,
    )
  })
})

function setupGameKontraWins() {
  players[0].isRe = () => true
  players[1].isRe = () => true
  players[2].isRe = () => false
  players[3].isRe = () => false

  players[3].win = vi.fn()

  round.currentTrick.add(jack.of(Suit.Hearts), players[0])
  round.currentTrick.add(jack.of(Suit.Spades), players[1])
  round.currentTrick.add(jack.of(Suit.Hearts), players[2])
  round.currentTrick.add(jack.of(Suit.Clubs), players[3])

  setupNoCardsLeft()

  players[0].trickStack = trickStack(0, [])
  players[1].trickStack = trickStack(110, [])
  players[2].trickStack = trickStack(130, [])
  players[3].trickStack = trickStack(0, [])
}

function trickStack(points: number, extras: Array<Extra>): TrickStack {
  return {
    points: () => points,
    extras: () => extras,
    tricks: new Array<Trick>(),
    add: () => {},
    cards: () => [],
  }
}

function setupNoCardsLeft() {
  players[0].hand.cards = []
  players[1].hand.cards = []
  players[2].hand.cards = []
  players[3].hand.cards = []
}
