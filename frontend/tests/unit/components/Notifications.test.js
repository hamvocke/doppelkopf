import Notifications from "@/components/Notifications";
import { Notifier } from "@/models/notifier";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = msg => msg;
VueTestUtils.config.mocks["$tc"] = msg => msg;
jest.useFakeTimers();

describe("Notifications.vue", () => {
  afterEach(() => {
    jest.runAllTimers();
  });

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

    new Notifier().sticky("An update is available!", null, jest.fn());

    expect(wrapper.vm.stickies).toHaveLength(1);
    expect(wrapper.vm.stickies[0].text).toBe("An update is available!");
  });

  // TODO: re-enable after upgrading vue-test-utils to v1
  it.skip("should handle sticky messages click", () => {
    const wrapper = mount(Notifications);
    const onClick = jest.fn();

    new Notifier().sticky("An update is available!", null, onClick);

    const allStickies = wrapper.findAll(".message .clickable");
    expect(allStickies).toHaveLength(1);

    allStickies.at(1).trigger("click");

    expect(onClick).toHaveBeenCalled();
  });

  it.skip("should dismiss sticky message on dismiss click", () => {
    const wrapper = mount(Notifications);

    new Notifier().sticky("An update is available!", null, jest.fn());

    const sticky = wrapper.find(".message .clickable");
    sticky.trigger("click");
    expect(wrapper.vm.stickies).toHaveLength(0);
  });
});
