import Player from '@/components/Player'
import { Game } from '@/models/game'
import { mount } from '@vue/test-utils'
import { ace, suits } from '@/models/card'

const game = new Game()

describe('Player.vue', () => {
  test('should display player\'s name', () => {
    game.players[0].name = 'some player'
    const wrapper = mount(Player, {propsData: { player: game.players[0] }})
    expect(wrapper.find('.name').text()).toEqual('some player')
  })

  test('should play card', () => {
    const cards = [ace.of(suits.spades)]
    game.players[0].hand.cards = cards
    const wrapper = mount(Player, {propsData: { player: game.players[0] }})

    expect(game.players[0].hand.cards).toHaveLength(1)

    wrapper.vm.play(cards[0])

    expect(game.players[0].hand.cards).toHaveLength(0)
  })

  test('should hide cards for computer player', () => {
    game.players[0].isHuman = false
    game.players[0].hand.cards = [ace.of(suits.spades)]
    const wrapper = mount(Player, {propsData: { player: game.players[0] }})

    expect(wrapper.vm.isCovered).toBe(true)
  })

  test('should make hand of computer player non-selectable', () => {
    game.players[0].isHuman = false

    const wrapper = mount(Player, {propsData: { player: game.players[0] }})

    expect(wrapper.vm.isHandSelectable).toBe(false)
  })
})
