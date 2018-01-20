import { TrickStack } from '@/models/trickStack'
import { Trick } from '@/models/trick'
import { Game } from '@/models/game'
import { ace, suits } from '@/models/card'

const trickStack = new TrickStack()
const game = new Game()

test('should add trick to trick stack', () => {
  const trick = new Trick(4)
  trick.add(ace.of(suits.hearts), game.players[0])
  trick.add(ace.of(suits.hearts), game.players[1])
  trick.add(ace.of(suits.spades), game.players[2])
  trick.add(ace.of(suits.clubs), game.players[3])

  trickStack.add(trick)

  expect(trickStack.tricks).toHaveLength(1)
  expect(trickStack.tricks[0]).toEqual(trick)
})

test('should throw error if adding non-finished trick to stack', () => {
  function invalidMove () {
    trickStack.add(new Trick(ace.of(suits.hearts)))
  }

  expect(invalidMove).toThrowError(`can not add an unfinished trick to the trick stack`)
})
