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

    expect(wrapper.vm.notifications).toHaveLength(1);
    expect(wrapper.vm.notifications[0].text).toBe("Hello World");
  });

  it("should display flash message", () => {
    const wrapper = mount(Notifications);

    new Notifier().flash("Doppelkopf");

    expect(wrapper.vm.flashMessages).toHaveLength(1);
    expect(wrapper.vm.flashMessages[0].text).toBe("Doppelkopf");
  });

  it("should display sticky messages", () => {
    const wrapper = mount(Notifications);

    new Notifier().sticky("An update is available!");

    expect(wrapper.vm.stickies).toHaveLength(1);
    expect(wrapper.vm.stickies[0].text).toBe("An update is available!");
  });
});
