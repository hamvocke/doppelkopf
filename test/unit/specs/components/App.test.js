import App from '@/App'
import { mount } from '@vue/test-utils'
import { Game } from '@/models/game'

describe('App.vue', () => {
  test('should render Table', () => {
    const wrapper = mount(App)
    expect(wrapper.findAll('.table').exists()).toBe(true)
  })

  test('should handle nextMove', () => {
    const mockGame = new Game()
    mockGame.currentRound.nextMove = jest.fn()

    const wrapper = mount(App, {
      propsData: {
        game: mockGame
      }
    })

    wrapper.vm.nextMove()

    expect(mockGame.currentRound.nextMove).toBeCalled()
  })

  test('should handle finishRound', () => {
    const mockGame = new Game()
    mockGame.currentRound.finishRound = jest.fn()

    const wrapper = mount(App, {
      propsData: {
        game: mockGame
      }
    })

    wrapper.vm.finishRound()

    expect(mockGame.currentRound.finishRound).toBeCalled()
  })

  test('should handle finishTrick event', () => {
    const mockGame = new Game()
    mockGame.currentRound.finishTrick = jest.fn()

    const wrapper = mount(App, {
      propsData: {
        game: mockGame
      }
    })

    wrapper.vm.finishTrick()

    expect(mockGame.currentRound.finishTrick).toBeCalled()
  })
})
