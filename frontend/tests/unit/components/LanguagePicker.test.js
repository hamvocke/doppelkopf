import LanguagePicker from "@/components/LanguagePicker";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = msg => msg;
config.mocks["$tc"] = msg => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("LanguagePicker.vue", () => {
  test("should show select with two language options", () => {
    const wrapper = mount(LanguagePicker);
    expect(wrapper.find("#languages").text()).toContain("en");
    expect(wrapper.find("#languages").text()).toContain("de");
  });
});
