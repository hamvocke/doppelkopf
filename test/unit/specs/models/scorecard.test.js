import { Scorecard } from '@/models/scorecard'
import { Player } from '@/models/player'

describe('Scorecard', () => {
  test('should play contain all players', () => {
    const players = [new Player('one'), new Player('two'), new Player('three')]
    const scorecard = new Scorecard(players)

    expect(scorecard.players).toHaveLength(3)
  })
})
