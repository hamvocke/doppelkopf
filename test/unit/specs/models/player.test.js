import { Player } from '@/models/player'
import { Game } from '@/models/game'
import { Hand } from '@/models/hand'
import { PlayedCard } from '@/models/playedCard'
import { king, queen, ten, suits, Card } from '@/models/card'
import { TrickStack } from '@/models/trickStack'
import { Notifier } from '@/models/notifier'

let game
let player
const notifier = new Notifier()

beforeEach(() => {
  game = new Game()
  player = game.players[0]
  player.game.waitingForPlayer = () => game.players[0]
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

test('should autoplay a card', () => {
  const queenOnHand = queen.of(suits.spades)
  const kingOnHand = king.of(suits.diamonds)
  player.game.currentTrick.baseCard = () => queen.of(suits.diamonds)
  player.hand = new Hand([queenOnHand, kingOnHand])
  player.behavior = {
    cardToPlay: jest.fn((hand, baseCard) => kingOnHand)
  }

  player.autoplay()

  expect(player.hand.cards).not.toContain(kingOnHand)
  expect(player.behavior.cardToPlay).toBeCalledWith(player.hand, expect.any(Card))
})

test('should not play a card if its not the players turn', () => {
  const queenOnHand = queen.of(suits.spades)
  player.hand = new Hand([queenOnHand])
  game.waitingForPlayer = () => game.players[1]

  player.play(queenOnHand)

  expect(player.hand.cards).toContain(queenOnHand)
})

test('should show notification if trying to play a card when its not your turn', () => {
  const queenOnHand = queen.of(suits.spades)
  player.hand = new Hand([queenOnHand])
  game.waitingForPlayer = () => game.players[1]

  player.play(queenOnHand)

  expect(notifier.messages).toContain('It\'s not your turn, buddy!')
})

test('should validate playable cards', () => {
  const queenOnHand = queen.of(suits.spades)
  const tenOnHand = ten.of(suits.spades)
  player.hand = new Hand([queenOnHand, tenOnHand])

  game.currentTrick.baseCard = () => ten.of(suits.spades)

  expect(player.canPlay(queenOnHand)).toBe(false)
  expect(player.canPlay(tenOnHand)).toBe(true)
})

test('should validate playable cards if no card has been played yet', () => {
  const queenOnHand = queen.of(suits.spades)
  const tenOnHand = ten.of(suits.spades)
  player.hand = new Hand([queenOnHand, tenOnHand])

  game.currentTrick.baseCard = () => undefined

  expect(player.canPlay(queenOnHand)).toBe(true)
  expect(player.canPlay(tenOnHand)).toBe(true)
})

test('should not play unplayable card', () => {
  const queenOnHand = queen.of(suits.spades)
  const tenOnHand = ten.of(suits.spades)
  const baseCard = ten.of(suits.spades)

  const player3 = game.players[3]
  game.waitingForPlayer = () => game.players[3]

  player.hand = new Hand([queenOnHand, tenOnHand])
  player3.hand = new Hand([baseCard])
  player3.play(baseCard)

  game.waitingForPlayer = () => game.players[0]
  player.play(queenOnHand)

  expect(player.hand.cards).toContain(queenOnHand)
  expect(notifier.messages).toContain(`Kannste so nicht spielen`)
})
