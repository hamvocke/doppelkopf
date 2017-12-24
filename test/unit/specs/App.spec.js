import Vue from 'vue'
import App from '@/App'

describe('App.vue', () => {
  test('should render 4 players', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('.player')).toHaveLength(4)
  })
})
