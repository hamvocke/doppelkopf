import { TrickStack } from '@/models/trickStack'
import { Trick } from '@/models/trick'
import { Game } from '@/models/game'
import { ace, suits } from '@/models/card'

let trickStack
const game = new Game()

beforeEach(() => {
  trickStack = new TrickStack()
})

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

test('should list all cards in trick stack', () => {
  const someTrick = new Trick(2)
  const anotherTrick = new Trick(2)
  someTrick.add(ace.of(suits.hearts), game.players[0])
  someTrick.add(ace.of(suits.hearts), game.players[1])
  anotherTrick.add(ace.of(suits.spades), game.players[0])
  anotherTrick.add(ace.of(suits.clubs), game.players[1])

  trickStack.add(someTrick)
  trickStack.add(anotherTrick)

  expect(trickStack.cards()).toHaveLength(4)
})

test('should throw error if adding non-finished trick to stack', () => {
  function invalidMove () {
    trickStack.add(new Trick(ace.of(suits.hearts)))
  }

  expect(invalidMove).toThrowError(`can not add an unfinished trick to the trick stack`)
})
