import { Score } from '@/models/score'
import { re, kontra } from '@/models/parties'

describe('score', () => {
  test('should have score for each party', () => {
    const rePoints = 118
    const kontraPoints = 122
    const score = new Score(rePoints, kontraPoints)

    expect(score.winner()).toEqual(kontra)
    expect(score.rePoints).toBe(118)
    expect(score.kontraPoints).toEqual(122)
  })

  test('should validate score', () => {
    function invalidScore () {
      /* eslint-disable no-new */
      new Score(121, 120)
    }

    expect(invalidScore).toThrowError(`A score must have a total of 240 points`)
  })

  test('should declare Kontra as winner if both have 120 points and there are no announcements', () => {
    const rePoints = 120
    const kontraPoints = 120
    const score = new Score(rePoints, kontraPoints)

    expect(score.winner()).toEqual(kontra)
  })

  test('should declare Re as winner', () => {
    const rePoints = 121
    const kontraPoints = 119
    const score = new Score(rePoints, kontraPoints)

    expect(score.winner()).toEqual(re)
  })

  test('should return points won in this round', () => {
    const score = new Score(150, 90)
    expect(score.points()).toBe(1)
  })
})
