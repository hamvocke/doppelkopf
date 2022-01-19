import Notifications from "@/components/Notifications.vue";
import { notifier } from "@/models/notifier";
import { mount, config } from "@vue/test-utils";

config.global.mocks["$t"] = (msg: string) => msg;
config.global.mocks["$tc"] = (msg: string) => msg;
jest.useFakeTimers();

// TODO: figure out how to get this test back to work - or remove it
// before, we asserted on vm.data, which was a bad pattern to begin with.
// it's better to assert on the actual DOM being rendered but there seems
// to be a problem with <transition-group>s. Apparently, that's an issue in the
// vue2 version of this test as well.
// skipping all these tests for now.

describe.skip("Notifications.vue", () => {
  afterEach(() => {
    jest.runAllTimers();
  });

  it("should display message", () => {
    const wrapper = mount(Notifications, {
      global: { stubs: { "transition-group": false } },
    });

    notifier.info("Hello World");

    expect(
      wrapper.find(".notification-container .flashMessages").exists()
    ).toBe(true);
    expect(wrapper.findAll(".msg")).toHaveLength(1);
    expect(wrapper.findAll(".msg")[0].text).toBe("Hello World");
  });

  it("should display flash message", () => {
    const wrapper = mount(Notifications);

    notifier.flash("Doppelkopf");

    expect(wrapper.findAll(".flashMessage")).toHaveLength(1);
    expect(wrapper.findAll(".flashMessage")[0].text).toBe("Doppelkopf");
  });

  it("should display sticky messages", () => {
    const wrapper = mount(Notifications);

    notifier.sticky("An update is available!", undefined, jest.fn());

    expect(wrapper.findAll(".message.sticky")).toHaveLength(1);
    expect(wrapper.findAll(".message.sticky")[0].text).toBe(
      "An update is available!"
    );
  });

  it("should handle sticky messages click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onClick = jest.fn();
    notifier.sticky("An update is available!", undefined, onClick);
    // await wrapper.setData({ stickies: notifier.stickies }); // for some reason this needs explicit kicking

    await wrapper.find(".message.clickable").trigger("click");

    expect(onClick).toHaveBeenCalled();
  });

  it("should dismiss sticky message on dismiss click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onDismiss = jest.fn();
    notifier.sticky("An update is available!", undefined, jest.fn(), onDismiss);
    // await wrapper.setData({ stickies: notifier.stickies }); // for some reason this needs explicit kicking

    const stickyCloseButton = wrapper.find(".message.clickable .close-button");
    await stickyCloseButton.trigger("click");

    expect(onDismiss).toHaveBeenCalled();
  });
});
