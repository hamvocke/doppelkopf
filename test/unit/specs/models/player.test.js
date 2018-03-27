import { Player } from '@/models/player'
import { Game } from '@/models/game'
import { Hand } from '@/models/hand'
import { PlayedCard } from '@/models/playedCard'
import { king, queen, suits } from '@/models/card'
import { TrickStack } from '@/models/trickStack'

let game
let player

beforeEach(() => {
  game = new Game()
  player = game.players[0]
})

test('player has a name', () => {
  expect(player.name).toBe('Player 1')
})

test('player is not human by default', () => {
  expect(new Player('some player').isHuman).toBe(false)
})

test('player has a trick stack', () => {
  expect(new Player('some player').trickStack).toBeDefined()
  expect(new Player('some player').trickStack instanceof TrickStack).toBe(true)
})

test('player can play card from hand', () => {
  const kingOnHand = king.of(suits.diamonds)
  const queenOnHand = queen.of(suits.spades)
  player.hand = new Hand([kingOnHand, queenOnHand])

  player.play(kingOnHand)

  expect(player.hand.cards).not.toContain(kingOnHand)
  expect(player.hand.cards).toContain(queenOnHand)
})

test('playing a card adds it to the current trick', () => {
  const queenOnHand = queen.of(suits.spades)
  player.hand = new Hand([queenOnHand])

  player.play(queenOnHand)

  const expectedCard = new PlayedCard(queenOnHand, player.name)

  expect(game.currentTrick.cards()).toEqual([expectedCard])
})

test('player cannot play card that is not on their hand', () => {
  player.hand = new Hand([king.of(suits.diamonds)])

  function invalidMove () {
    player.play(queen.of(suits.diamonds))
  }

  expect(invalidMove).toThrowError('can\'t play a card that\'s not on the player\'s hand')
})

test('player cannot play undefined card', () => {
  player.hand = new Hand([king.of(suits.diamonds)])

  function invalidMove () {
    player.play()
  }

  expect(invalidMove).toThrowError('can\'t play a card that\'s not on the player\'s hand')
})

test('player can win a trick', () => {
  const trick = { isFinished: () => true }

  player.win(trick)

  expect(player.trickStack.tricks).toEqual([trick])
})

test('should tell game to move to next player after making a move', () => {
  const queenOnHand = queen.of(suits.spades)
  player.hand = new Hand([queenOnHand])
  const gameMock = {
    nextMove: jest.fn(),
    currentTrick: { add: jest.fn() }
  }
  player.game = gameMock

  player.play(queenOnHand)

  expect(gameMock.nextMove.mock.calls.length).toBe(1)
})

test('should autoplay a card', () => {
  const queenOnHand = queen.of(suits.spades)
  const kingOnHand = king.of(suits.hearts)
  player.hand = new Hand([queenOnHand, kingOnHand])
  player.behavior = {
    cardToPlay: (hand, baseCard) => kingOnHand
  }

  player.autoplay()

  expect(player.hand.cards).not.toContain(kingOnHand)
})
