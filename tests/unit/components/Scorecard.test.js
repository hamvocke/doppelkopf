import Scorecard from '@/components/Scorecard'
import { Scorecard as ScorecardModel } from '@/models/scorecard'
import { mount } from '@vue/test-utils'

describe('Scorecard.vue', () => {
  it('should display scorecard', () => {
    const model = new ScorecardModel()
    const wrapper = mount(Scorecard, {propsData: { scorecard: model }})

    expect(wrapper.find('table').exists()).toBe(true)
  })
})
