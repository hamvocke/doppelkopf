import { Evaluator } from '@/models/evaluator'
import { Game } from '@/models/game'
import { Trick } from '@/models/trick'
import { ace, jack, suits } from '@/models/card'

let evaluator
let players

beforeEach(() => {
  evaluator = new Game().evaluator
  players = evaluator.game.players
})

describe('Evaluator', () => {
  test('should have default empty game', () => {
    expect(new Evaluator().game).toEqual({})
  })

  test('should know the game', () => {
    expect(evaluator.game).toBeDefined()
  })

  test('should give trick to winner', () => {
    const trick = new Trick(4)
    trick.add(ace.of(suits.hearts), players[0])
    trick.add(jack.of(suits.diamonds), players[1])
    trick.add(ace.of(suits.hearts), players[2])
    trick.add(jack.of(suits.hearts), players[3])

    evaluator.evaluateTrick(trick)

    expect(players[3].trickStack.tricks).toHaveLength(1)
  })
})
