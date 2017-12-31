import Trick from '@/components/Trick'
import { Game } from '@/models/game'
import { mount } from 'vue-test-utils'
import { ace, suits } from '@/models/card'

const game = new Game()

describe('Trick.vue', () => {
  test('should show empty trick on initialization', () => {
    const trick = game.nextTrick()
    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})
    expect(wrapper.findAll('div.card').length).toEqual(0)
  })

  test('should render cards in current trick', () => {
    const trick = game.nextTrick()
    trick.add(ace.of(suits.hearts), game.players[0])

    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    expect(wrapper.findAll('div.card').length).toEqual(1)
  })

  test('should render winner', () => {
    const trick = game.nextTrick()
    trick.add(ace.of(suits.hearts), game.players[0])

    const wrapper = mount(Trick, {propsData: { currentTrick: trick }})

    expect(wrapper.find('div.winner').text()).toContain(game.players[0].name)
  })
})
