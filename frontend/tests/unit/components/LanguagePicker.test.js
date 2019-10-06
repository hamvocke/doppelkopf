import LanguagePicker from "@/components/LanguagePicker";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = msg => msg;
VueTestUtils.config.mocks["$tc"] = msg => msg;
VueTestUtils.config.mocks["$i18n"] = { locale: "en" };

describe("LanguagePicker.vue", () => {
  test("should show select with two language options", () => {
    const wrapper = mount(LanguagePicker);
    expect(wrapper.find("#languages").text()).toContain("en");
    expect(wrapper.find("#languages").text()).toContain("de");
  });
});
