import Vue from 'vue'
import Hand from '@/components/Hand'
import { ace, queen, suits } from '@/models/card'
import { Hand as HandModel } from '@/models/hand'

const reHand = new HandModel([
  queen.of(suits.clubs),
  ace.of(suits.hearts),
  ace.of(suits.hearts),
  ace.of(suits.clubs)])

const kontraHand = new HandModel([
  ace.of(suits.hearts),
  ace.of(suits.hearts),
  ace.of(suits.clubs)])

describe('Hand.vue', () => {
  test('should render each card', () => {
    const Constructor = Vue.extend(Hand)
    const vm = new Constructor({propsData: { hand: reHand }}).$mount()
    expect(vm.$el.querySelectorAll('div.card')).toHaveLength(4)
  })

  test('should tell if hand is re', () => {
    const Constructor = Vue.extend(Hand)
    const vm = new Constructor({propsData: { hand: reHand }}).$mount()
    expect(vm.$el.querySelector('div.party').textContent.trim()).toEqual('Re')
  })

  test('should tell if hand is kontra', () => {
    const Constructor = Vue.extend(Hand)
    const vm = new Constructor({propsData: { hand: kontraHand }}).$mount()
    expect(vm.$el.querySelector('div.party').textContent.trim()).toEqual('Kontra')
  })

  test('should keep track of selected card', () => {
    const Constructor = Vue.extend(Hand)
    const vm = new Constructor({propsData: { hand: kontraHand }}).$mount()
    vm.select(ace.of(suits.hearts))
    expect(vm.selectedCard).toEqual(ace.of(suits.hearts))
  })
})
