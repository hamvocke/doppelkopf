import App from '@/App'
import { mount } from '@vue/test-utils'
import { Game } from '@/models/game'

describe('App.vue', () => {
  test('should render Table', () => {
    const wrapper = mount(App)
    expect(wrapper.findAll('.table').exists()).toBe(true)
  })
})
