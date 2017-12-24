import Vue from 'vue'
import Hand from '@/components/Hand'
import { ace, queen, suits } from '@/models/card'
import { Hand as HandModel } from '@/models/hand'

const handModel = new HandModel([
  queen.of(suits.pikes),
  ace.of(suits.hearts),
  ace.of(suits.hearts),
  ace.of(suits.pikes)])

describe('Hand.vue', () => {
  test('should render each card', () => {
    const Constructor = Vue.extend(Hand)
    const vm = new Constructor({propsData: { hand: handModel }}).$mount()
    expect(vm.$el.querySelectorAll('div.card')).toHaveLength(4)
  })
})
