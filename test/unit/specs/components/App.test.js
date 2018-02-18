import App from '@/App'
import { mount } from '@vue/test-utils'
import { Game } from '@/models/game'

describe('App.vue', () => {
  test('should render 4 players', () => {
    const wrapper = mount(App, {
      propsData: {
        game: new Game()
      }
    })
    expect(wrapper.findAll('.player')).toHaveLength(4)
  })

  test('should render current trick', () => {
    const wrapper = mount(App, {
      propsData: {
        game: new Game()
      }
    })
    expect(wrapper.find('.trick').exists()).toBe(true)
  })
})
