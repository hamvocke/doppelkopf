import { Score } from '@/models/score'

describe('score', () => {
  test('should have score for each party', () => {
    const rePoints = 118
    const kontraPoints = 122
    const score = new Score(rePoints, kontraPoints)

    expect(score.winner()).toEqual('Kontra')
    expect(score.rePoints).toBe(118)
    expect(score.kontraPoints).toEqual(122)
  })

  test('should declare Kontra as winner if both have 120 points and there are no announcements', () => {
    const rePoints = 120
    const kontraPoints = 120
    const score = new Score(rePoints, kontraPoints)

    expect(score.winner()).toEqual('Kontra')
  })
})
