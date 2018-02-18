import Card from '@/components/Card'
import { ace, suits } from '@/models/card'
import { mount } from '@vue/test-utils'

describe('Card.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Card, {
      propsData: {
        card: ace.of(suits.hearts),
        isCovered: false
      }
    })
    expect(wrapper.text()).toBe('♥ A ♥')
  })

  it('should render hearts suit red', () => {
    const wrapper = mount(Card, {
      propsData: {
        card: ace.of(suits.hearts),
        isCovered: false
      }
    })
    expect(wrapper.find('.suitTop').classes()).toContain('red')
    expect(wrapper.find('.suitTop').classes()).not.toContain('black')
  })

  it('should render clubs suit black', () => {
    const wrapper = mount(Card, {
      propsData: {
        card: ace.of(suits.clubs),
        isCovered: false
      }
    })
    expect(wrapper.find('.suitTop').classes()).toContain('black')
    expect(wrapper.find('.suitTop').classes()).not.toContain('red')
  })

  it('should render selected card', () => {
    const wrapper = mount(Card, {
      propsData: {
        card: ace.of(suits.spades),
        isSelected: true,
        isCovered: false
      }
    })
    expect(wrapper.classes()).toContain('selected')
  })

  it('covered card should not show rank and suit', () => {
    const wrapper = mount(Card, {
      propsData: {
        card: ace.of(suits.spades),
        isSelected: false,
        isCovered: true
      }
    })

    expect(wrapper.text()).not.toContain('A')
    expect(wrapper.text()).not.toContain('♥')
  })

  it('should render covered card', () => {
    const wrapper = mount(Card, {
      propsData: {
        card: ace.of(suits.spades),
        isCovered: true
      }
    })

    expect(wrapper.find('.background').exists()).toBe(true)
  })
})
