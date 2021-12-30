import Notifications from "@/components/Notifications.vue";
import { Notifier } from "@/models/notifier";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
jest.useFakeTimers();

describe("Notifications.vue", () => {
  const notifier = new Notifier();
  afterEach(() => {
    jest.runAllTimers();
  });

  it("should display message", () => {
    const wrapper = mount(Notifications);

    notifier.info("Hello World");

    expect(wrapper.vm.$data.notifications).toHaveLength(1);
    expect(wrapper.vm.$data.notifications[0].text).toBe("Hello World");
  });

  it("should display flash message", () => {
    const wrapper = mount(Notifications);

    notifier.flash("Doppelkopf");

    expect(wrapper.vm.$data.flashMessages).toHaveLength(1);
    expect(wrapper.vm.$data.flashMessages[0].text).toBe("Doppelkopf");
  });

  it("should display sticky messages", () => {
    const wrapper = mount(Notifications);

    notifier.sticky("An update is available!", undefined, jest.fn());

    expect(wrapper.vm.$data.stickies).toHaveLength(1);
    expect(wrapper.vm.$data.stickies[0].text).toBe("An update is available!");
  });

  it("should handle sticky messages click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onClick = jest.fn();
    notifier.sticky("An update is available!", undefined, onClick);
    await wrapper.setData({ stickies: notifier.stickies }); // for some reason this needs explicit kicking

    await wrapper.find(".message.clickable").trigger("click");

    expect(onClick).toHaveBeenCalled();
  });

  it("should dismiss sticky message on dismiss click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onDismiss = jest.fn();
    notifier.sticky("An update is available!", undefined, jest.fn(), onDismiss);
    await wrapper.setData({ stickies: notifier.stickies }); // for some reason this needs explicit kicking

    const stickyCloseButton = wrapper.find(".message.clickable .close-button");
    await stickyCloseButton.trigger("click");

    expect(onDismiss).toHaveBeenCalled();
  });
});
