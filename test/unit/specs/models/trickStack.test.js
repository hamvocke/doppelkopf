import { TrickStack } from '@/models/trickStack'
import { Trick } from '@/models/trick'
import { ace, suits } from '@/models/card'

const trickStack = new TrickStack()

test('should add trick to trick stack', () => {
  const trick = new Trick(ace.of(suits.hearts), ace.of(suits.hearts), ace.of(suits.spades), ace.of(suits.clubs))

  trickStack.add(trick)

  expect(trickStack.tricks).toHaveLength(1)
  expect(trickStack.tricks[0]).toEqual(trick)
})
