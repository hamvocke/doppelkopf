import Hand from '@/components/Hand'
import { ace, queen, suits } from '@/models/card'
import { Hand as HandModel } from '@/models/hand'
import { mount } from '@vue/test-utils'

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
    const wrapper = mount(Hand, { propsData: { hand: reHand } })
    expect(wrapper.findAll('div.card').length).toBe(4)
  })

  test('should tell if hand is re', () => {
    const wrapper = mount(Hand, { propsData: { hand: reHand } })
    expect(wrapper.find('div.party').text()).toEqual('Re')
  })

  test('should tell if hand is kontra', () => {
    const wrapper = mount(Hand, { propsData: { hand: kontraHand } })
    expect(wrapper.find('div.party').text()).toEqual('Kontra')
  })

  test('should keep track of selected card', () => {
    const wrapper = mount(Hand, { propsData: { hand: kontraHand } })
    const cardToBeSelected = kontraHand.cards[0]
    wrapper.vm.select(cardToBeSelected)
    expect(wrapper.vm.selectedCard).toEqual(cardToBeSelected)
  })

  test('clicking on card should select card', () => {
    const wrapper = mount(Hand, { propsData: { hand: kontraHand } })
    wrapper.findAll('div.card').at(0).trigger('click')
    expect(wrapper.vm.selectedCard).toEqual(kontraHand.cards[0])
  })

  test('trigger play event when clicking on already selected card', () => {
    const wrapper = mount(Hand, { propsData: { hand: kontraHand } })
    const card = kontraHand.cards[1]

    wrapper.vm.select(card)
    wrapper.vm.select(card)

    expect(wrapper.emitted().play.length).toBe(1)
  })
})
