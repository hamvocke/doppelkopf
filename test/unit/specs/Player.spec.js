import Player from '@/components/Player'
import { Game } from '@/models/game'
import { mount } from '@vue/test-utils'
import { ace, suits } from '@/models/card'

const game = new Game()

describe('Player.vue', () => {
  test('should display player\'s name', () => {
    const wrapper = mount(Player, {propsData: { player: game.players[0] }})
    expect(wrapper.find('h2.name').text()).toEqual('Player 1')
  })

  test('should play card', () => {
    const cards = [ace.of(suits.spades)]
    game.players[0].hand.cards = cards
    const wrapper = mount(Player, {propsData: { player: game.players[0] }})

    expect(game.players[0].hand.cards).toHaveLength(1)

    wrapper.vm.play(cards[0])

    expect(game.players[0].hand.cards).toHaveLength(0)
  })
})
