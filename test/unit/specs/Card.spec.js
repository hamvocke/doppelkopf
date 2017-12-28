import Vue from 'vue'
import Card from '@/components/Card'
import { ace, suits } from '@/models/card'

describe('Card.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { card: ace.of(suits.hearts) }}).$mount()
    expect(vm.$el.textContent).toContain('A ♥')
  })

  it('should render hearts suit red', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { card: ace.of(suits.hearts) }}).$mount()
    expect(vm.classObject).toEqual({'red': true, 'black': false})
  })

  it('should render spades suit red', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { card: ace.of(suits.spades) }}).$mount()
    expect(vm.classObject).toEqual({'red': false, 'black': true})
  })

  it('should render selected card', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { card: ace.of(suits.spades), isSelected: true }}).$mount()
    expect(vm.$el.classList).toContain('selected')
  })
})
