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

  test('should render trick', () => {
    const wrapper = mount(Table, {propsData: { game: game }})
    expect(wrapper.find('div.trick').exists()).toBe(true)
  })

  test('should render controls', () => {
    const wrapper = mount(Table, {propsData: { game: game }})
    expect(wrapper.find('div.controls').exists()).toBe(true)
  })

  test('should handle nextMove', () => {
    const mockGame = new Game()
    mockGame.currentRound.nextMove = jest.fn()

    const wrapper = mount(Table, {propsData: { game: mockGame }})

    wrapper.vm.nextMove()

    expect(mockGame.currentRound.nextMove).toBeCalled()
  })

  test('should handle finishRound', () => {
    const mockGame = new Game()
    mockGame.currentRound.finishRound = jest.fn()

    const wrapper = mount(Table, {propsData: { game: mockGame }})

    wrapper.vm.finishRound()

    expect(mockGame.currentRound.finishRound).toBeCalled()
  })

  test('should handle finishTrick event', () => {
    const mockGame = new Game()
    mockGame.currentRound.finishTrick = jest.fn()

    const wrapper = mount(Table, {propsData: { game: mockGame }})

    wrapper.vm.finishTrick()

    expect(mockGame.currentRound.finishTrick).toBeCalled()
  })
})
