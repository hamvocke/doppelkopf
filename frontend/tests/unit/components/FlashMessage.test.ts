import FlashMessage from "@/components/FlashMessage.vue";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = () => {};
config.mocks["$tc"] = () => {};

describe("FlashMessage.vue", () => {
  test("should show message", () => {
    const wrapper = mount(FlashMessage, {
      propsData: { message: "some message" }
    });
    expect(wrapper.find(".flashMessage").text()).toBe("some message");
  });

  test("should show icon if present", () => {
    const wrapper = mount(FlashMessage, {
      propsData: { message: "some message", icon: ":)" }
    });

    expect(wrapper.find(".icon").text()).toBe(":)");
  });

  test("should not show icon if none is provided", () => {
    const wrapper = mount(FlashMessage, {
      propsData: { message: "some message" }
    });

    expect(wrapper.find(".icon").exists()).toBe(false);
  });
});
