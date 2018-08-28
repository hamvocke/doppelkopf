import { options } from '@/models/options'

describe('Options', () => {
  test('should have autoplay option', () => {
    expect(options.autoplay).toBe(true)
  })
})
