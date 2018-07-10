import Table from '@/components/Table'
import { Game } from '@/models/game'
import { mount } from '@vue/test-utils'

let game

beforeEach(() => {
  game = new Game()
})

describe('Table.vue', () => {
  test('should render players', () => {
    const wrapper = mount(Table, {propsData: { game: game }})
    expect(wrapper.findAll('div.player')).toHaveLength(4)
  })
})
