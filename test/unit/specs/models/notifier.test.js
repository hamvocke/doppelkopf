import { Notifier } from '@/models/notifier'

const notifier = new Notifier()

test('notifier is always the same instance', () => {
  const anotherNotifier = new Notifier()
  expect(notifier).toBe(anotherNotifier)
})

test('should add notification', () => {
  notifier.info('Hello World')

  expect(notifier.messages).toContain('Hello World')
})
