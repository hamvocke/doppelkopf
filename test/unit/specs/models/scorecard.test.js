import { Scorecard } from '@/models/scorecard'
import { Player } from '@/models/player'

describe('Scorecard', () => {
  const players = [new Player('one'), new Player('two'), new Player('three'), new Player('four')]
  const scorecard = new Scorecard(players)

  test('should play contain all players', () => {
    expect(scorecard.players).toHaveLength(4)
  })

  test('should initialize all players with 0 points', () => {
    expect(scorecard.scoreFor(players[0])).toBe(0)
    expect(scorecard.scoreFor(players[1])).toBe(0)
    expect(scorecard.scoreFor(players[2])).toBe(0)
    expect(scorecard.scoreFor(players[3])).toBe(0)
  })

  test('should calculate scores', () => {
    const firstScore = {}
    firstScore[players[0].name] = 4
    firstScore[players[1].name] = -4
    firstScore[players[2].name] = -4
    firstScore[players[3].name] = 4

    const secondScore = {}
    secondScore[players[0].name] = -2
    secondScore[players[1].name] = 2
    secondScore[players[2].name] = -2
    secondScore[players[3].name] = 2

    scorecard.addScoreLine(firstScore)
    scorecard.addScoreLine(secondScore)

    expect(scorecard.scoreFor(players[0])).toBe(2)
    expect(scorecard.scoreFor(players[1])).toBe(-2)
    expect(scorecard.scoreFor(players[2])).toBe(-6)
    expect(scorecard.scoreFor(players[3])).toBe(6)
  })
})
