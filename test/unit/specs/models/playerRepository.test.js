import { PlayerRepository } from '@/models/playerRepository'

const repo = new PlayerRepository()

describe('PlayerRepository', () => {
  test('should always be same instance', () => {
    const anotherRepo = new PlayerRepository()
    expect(repo).toBe(anotherRepo)
  })
})
