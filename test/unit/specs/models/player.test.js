import { Game } from '@/models/game'
import { Hand } from '@/models/hand'
import { PlayedCard } from '@/models/playedCard'
import { king, queen, suits } from '@/models/card'

let game
let player

beforeEach(() => {
  game = new Game()
  player = game.players[0]
})

test('player has a name', () => {
  expect(player.name).toBe('Player 1')
})

test('player knows their game', () => {
  expect(player.game).toBeDefined()
})

test('player can play card from hand', () => {
  const kingOnHand = king.of(suits.diamonds)
  const queenOnHand = queen.of(suits.spades)
  player.hand = new Hand([kingOnHand, queenOnHand])

  player.play(king.of(suits.diamonds))

  expect(player.hand.cards).not.toContain(kingOnHand)
  expect(player.hand.cards).toContain(queenOnHand)
})

test('playing a card adds it to the current trick', () => {
  const queenOnHand = queen.of(suits.spades)
  player.hand = new Hand([queenOnHand])

  player.play(queen.of(suits.spades))

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
