import Trick from '@/components/Trick'
import { Game } from '@/models/game'
import { mount } from 'vue-test-utils'
import { ace, suits } from '@/models/card'

const game = new Game()

describe('Player.vue', () => {
  test('should show empty trick on initialization', () => {
    const wrapper = mount(Trick, {propsData: { currentTrick: game.currentTrick }})
    expect(wrapper.findAll('div.card').length).toEqual(0)
  })

  test('should render cards in current trick', () => {
    game.currentTrick.add(ace.of(suits.hearts))

    const wrapper = mount(Trick, {propsData: { currentTrick: game.currentTrick }})

    expect(wrapper.findAll('div.card').length).toEqual(1)
  })
})
