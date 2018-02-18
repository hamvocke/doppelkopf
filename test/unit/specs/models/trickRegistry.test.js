import { trickRegistry } from '@/models/trickRegistry'
import { Trick } from '@/models/trick'

describe('trick registry', () => {
  test('should always be the same instance', () => {
    const firstInstance = trickRegistry
    const secondInstance = trickRegistry
    expect(firstInstance).toBe(secondInstance)
  })

  test('should return undefined if no trick is added', () => {
    expect(trickRegistry.current()).toBeUndefined()
  })

  test('should return current trick', () => {
    const trick = new Trick()
    trickRegistry.add(trick)
    expect(trickRegistry.current()).toBe(trick)
  })
})
