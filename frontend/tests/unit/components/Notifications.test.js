import Notifications from "@/components/Notifications";
import { Notifier } from "@/models/notifier";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = msg => msg;
VueTestUtils.config.mocks["$tc"] = msg => msg;

describe("Notifications.vue", () => {
  it("should display message", () => {
    const wrapper = mount(Notifications);

    new Notifier().info("Hello World");

    expect(wrapper.vm.messages).toHaveLength(1);
    expect(wrapper.vm.messages[0].text).toBe("Hello World");
  });
});
