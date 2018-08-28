import { testOptions, options } from '@/models/options'

describe('Options', () => {
  test('should have autoplay option', () => {
    expect(options.autoplay).toBe(true)
  })

  test('should have autoplay set to false for test options', () => {
    expect(testOptions.autoplay).toBe(false)
  })
})
