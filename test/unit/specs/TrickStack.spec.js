import TrickStack from '@/components/TrickStack'
import { TrickStack as TrickStackModel } from '@/models/trickStack'
import { Trick } from '@/models/trick'
import { Player } from '@/models/player'
import { ace, queen, suits } from '@/models/card'
import { mount } from '@vue/test-utils'

const player1 = new Player('player 1')
const player2 = new Player('player 2')
const trick = new Trick(2)
trick.add(ace.of(suits.hearts), player1)
trick.add(queen.of(suits.spades), player2)

describe('TrickStack.vue', () => {
  test('should render each card', () => {
    const trickStack = new TrickStackModel()
    trickStack.add(trick)
    const wrapper = mount(TrickStack, { propsData: { trickStack: trickStack } })
    expect(trick.playedCards).toHaveLength(2)
    expect(wrapper.vm.cards).toHaveLength(2)
    expect(wrapper.findAll('div.card')).toHaveLength(2)
  })
})
