import Vue from 'vue'
import Player from '@/components/Player'
import { Game } from '@/models/game'

const game = new Game()

describe('Player.vue', () => {
  test('should display player\'s name', () => {
    const Constructor = Vue.extend(Player)
    const vm = new Constructor({propsData: { player: game.players[0] }}).$mount()
    expect(vm.$el.querySelector('h2.name').textContent.trim()).toEqual('Player 1')
  })
})
