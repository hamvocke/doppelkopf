import Message from '@/components/Message'
import { mount } from '@vue/test-utils'

describe('Message.vue', () => {
  it('should display message', () => {
    const wrapper = mount(Message, {
      propsData: {
        message: 'Hello World'
      }
    })

    expect(wrapper.text()).toBe('Hello World')
  })
})
