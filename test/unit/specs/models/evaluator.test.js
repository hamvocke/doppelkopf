import { Evaluator } from '@/models/evaluator'
import { Game } from '@/models/game'

let evaluator
beforeEach(() => {
  evaluator = new Game().evaluator
})

describe('Evaluator', () => {
  test('should have default empty game', () => {
    expect(new Evaluator().game).toEqual({})
  })

  test('should know the game', () => {
    expect(evaluator.game).toBeDefined()
  })
})
