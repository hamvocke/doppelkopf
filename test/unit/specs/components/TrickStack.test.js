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
  test('should render nothing if player has no trick', () => {
    const emptyTrickStack = new TrickStackModel()
    const wrapper = mount(TrickStack, { propsData: { trickStack: emptyTrickStack } })
    expect(wrapper.find('div.trickStack').exists()).toBe(false)
  })

  test('should render one trick as soon as player has a trick', () => {
    const trickStack = new TrickStackModel()
    trickStack.add(trick)
    const wrapper = mount(TrickStack, { propsData: { trickStack: trickStack } })
    expect(trick.playedCards).toHaveLength(2)
    expect(wrapper.find('div.trickStack').exists()).toBe(true)
    expect(wrapper.findAll('div.card')).toHaveLength(1)
  })

  test('should display number of won tricks', () => {
    const trickStack = new TrickStackModel()
    trickStack.add(trick)
    trickStack.add(trick)
    const wrapper = mount(TrickStack, { propsData: { trickStack: trickStack } })
    expect(wrapper.find('p.trickCount').text()).toContain('2')
  })
})
