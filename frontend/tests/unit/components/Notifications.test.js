import Notifications from "@/components/Notifications";
import { Notifier } from "@/models/notifier";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = msg => msg;
config.mocks["$tc"] = msg => msg;
jest.useFakeTimers();

describe("Notifications.vue", () => {
  const notifier = new Notifier();
  afterEach(() => {
    jest.runAllTimers();
  });

  it("should display message", () => {
    const wrapper = mount(Notifications);

    notifier.info("Hello World");

    expect(wrapper.vm.notifications).toHaveLength(1);
    expect(wrapper.vm.notifications[0].text).toBe("Hello World");
  });

  it("should display flash message", () => {
    const wrapper = mount(Notifications);

    notifier.flash("Doppelkopf");

    expect(wrapper.vm.flashMessages).toHaveLength(1);
    expect(wrapper.vm.flashMessages[0].text).toBe("Doppelkopf");
  });

  it("should display sticky messages", () => {
    const wrapper = mount(Notifications);

    notifier.sticky("An update is available!", null, jest.fn());

    expect(wrapper.vm.stickies).toHaveLength(1);
    expect(wrapper.vm.stickies[0].text).toBe("An update is available!");
  });

  it("should handle sticky messages click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onClick = jest.fn();
    notifier.sticky("An update is available!", null, onClick);
    await wrapper.setData({ stickies: notifier.stickies }); // for some reason this needs explicit kicking

    await wrapper.find(".message.clickable").trigger("click");

    expect(onClick).toHaveBeenCalled();
  });

  it("should dismiss sticky message on dismiss click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onDismiss = jest.fn();
    notifier.sticky("An update is available!", null, jest.fn(), onDismiss);
    await wrapper.setData({ stickies: notifier.stickies }); // for some reason this needs explicit kicking

    const stickyCloseButton = wrapper.find(".message.clickable .close-button");
    await stickyCloseButton.trigger("click");

    expect(onDismiss).toHaveBeenCalled();
  });
});
