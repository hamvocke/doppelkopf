import OptionsMenu from "@/components/OptionsMenu";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = msg => msg;
VueTestUtils.config.mocks["$tc"] = msg => msg;
VueTestUtils.config.mocks["$i18n"] = { locale: "en" };

describe("OptionsMenu.vue", () => {
  test("should show options icon", () => {
    const wrapper = mount(OptionsMenu, { propsData: { isVisible: false } });
    expect(wrapper.find(".options-icon").exists()).toBe(true);
  });

  test("should not show options", () => {
    const wrapper = mount(OptionsMenu, { propsData: { isVisible: false } });
    expect(wrapper.find(".options-menu").exists()).toBe(false);
  });

  test("should show options", () => {
    const wrapper = mount(OptionsMenu, { propsData: { isVisible: true } });
    expect(wrapper.find(".options-menu").exists()).toBe(true);
  });

  test("should contain language picker", () => {
    const wrapper = mount(OptionsMenu, { propsData: { isVisible: true } });
    expect(wrapper.find(".options-menu #languages").exists()).toBe(true);
  });
});
