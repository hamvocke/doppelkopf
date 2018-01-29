import Notifications from '@/components/Notifications'
import { mount } from '@vue/test-utils'

describe('Notifications.vue', () => {
  it('should display message', () => {
    const wrapper = mount(Notifications, {
      propsData: {
        message: 'Hello World'
      }
    })

    expect(wrapper.text()).toBe('Hello World')
  })
})
