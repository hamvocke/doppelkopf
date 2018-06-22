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
})
