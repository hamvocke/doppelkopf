import { afterEach, describe, expect, test, vi } from "vitest";
import Notifications from "@/components/Notifications.vue";
import { notifier } from "@/models/notifier";
import { mount, config } from "@vue/test-utils";
import { nextTick } from "vue";

config.global.mocks["$t"] = (msg: string) => msg;
config.global.mocks["$tc"] = (msg: string) => msg;
vi.useFakeTimers();

describe("Notifications.vue", () => {
  afterEach(() => {
    vi.runAllTimers();
  });

  test("should display message", async () => {
    const wrapper = mount(Notifications);

    notifier.info("Hello World");
    await nextTick();

    expect(
      wrapper.find(".notification-container .flashMessages").exists()
    ).toBe(true);
    expect(wrapper.findAll(".msg")).toHaveLength(1);
    expect(wrapper.findAll(".msg")[0].text()).toBe("Hello World");
  });

  test("should display flash message", async () => {
    const wrapper = mount(Notifications);

    notifier.flash("Doppelkopf");
    await nextTick();

    expect(wrapper.findAll(".flashMessage")).toHaveLength(1);
    expect(wrapper.findAll(".flashMessage")[0].text()).toBe("Doppelkopf");
  });

  test("should display sticky messages", async () => {
    const wrapper = mount(Notifications);

    notifier.sticky("An update is available!", undefined, vi.fn());
    await nextTick();

    expect(wrapper.findAll(".msg.sticky")).toHaveLength(1);
    expect(wrapper.findAll(".msg.sticky")[0].text()).toBe(
      "An update is available!"
    );
  });

  test("should handle sticky messages click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onClick = vi.fn();

    notifier.sticky("An update is available!", undefined, onClick);
    await nextTick();
    await wrapper.find(".msg.clickable").trigger("click");

    expect(onClick).toHaveBeenCalled();
  });

  test("should dismiss sticky message on dismiss click", async () => {
    notifier.stickies = [];
    const wrapper = mount(Notifications);
    const onDismiss = vi.fn();
    notifier.sticky("An update is available!", undefined, vi.fn(), onDismiss);
    await nextTick();

    const stickyCloseButton = wrapper.find(".msg.clickable .close-button");
    await stickyCloseButton.trigger("click");

    expect(onDismiss).toHaveBeenCalled();
  });
});
