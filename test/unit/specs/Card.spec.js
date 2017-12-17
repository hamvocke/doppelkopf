import Vue from 'vue'
import Card from '@/components/Card'

describe('Card.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { rank: 'Q', suite: '♥' }}).$mount()
    expect(vm.$el.textContent).toContain('Q ♥')
  })
})
