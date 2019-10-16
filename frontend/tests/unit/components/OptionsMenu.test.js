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
});
