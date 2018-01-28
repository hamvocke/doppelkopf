import { Player as PlayerModel } from '@/models/player'
import Player from '@/components/Player'
import { Game } from '@/models/game'
import { mount } from '@vue/test-utils'
import { ace, suits } from '@/models/card'

const game = new Game()

describe('Player.vue', () => {
  test('should display player\'s name', () => {
    const player = new PlayerModel('some player', {}, false)
    const wrapper = mount(Player, {propsData: { player: player }})
    expect(wrapper.find('h2.name').text()).toEqual('some player')
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
    const player = new PlayerModel('some player', {}, false)
    player.hand.cards = [ace.of(suits.spades)]
    const wrapper = mount(Player, {propsData: { player: player }})

    expect(wrapper.vm.isCovered).toBe(true)
  })
})
