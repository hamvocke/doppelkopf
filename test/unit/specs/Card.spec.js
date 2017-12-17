import Vue from 'vue'
import Card from '@/components/Card'
import { ace, suites } from '@/models/card'

describe('Card.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { card: ace.of(suites.hearts) }}).$mount()
    expect(vm.$el.textContent).toContain('A ♥')
  })

  it('should render hearts suite red', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { card: ace.of(suites.hearts) }}).$mount()
    expect(vm.classObject).toEqual({'red': true, 'black': false})
  })

  it('should render spades suite red', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({propsData: { card: ace.of(suites.spades) }}).$mount()
    expect(vm.classObject).toEqual({'red': false, 'black': true})
  })
})
