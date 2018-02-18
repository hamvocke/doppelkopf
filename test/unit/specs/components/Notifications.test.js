import Notifications from '@/components/Notifications'
import { Notifier } from '@/models/notifier'
import { mount } from '@vue/test-utils'

describe('Notifications.vue', () => {
  it('should display message', () => {
    const wrapper = mount(Notifications)

    new Notifier().info('Hello World')

    expect(wrapper.vm.messages).toEqual(['Hello World'])
  })
})
