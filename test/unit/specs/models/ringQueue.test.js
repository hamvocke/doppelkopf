import { RingQueue } from '@/models/ringQueue'

describe('ring queue', () => {
  test('should have n elements', () => {
    const queue = new RingQueue([1, 2, 3, 4])
    expect(queue.length()).toBe(4)
  })

  test('should return next element', () => {
    const queue = new RingQueue([1, 2])
    expect(queue.next()).toBe(1)
    expect(queue.next()).toBe(2)
    expect(queue.next()).toBe(1)
  })
})
