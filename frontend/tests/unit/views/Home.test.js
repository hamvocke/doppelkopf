import Home from "@/views/Home";
import { shallowMount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";
import { RouterLinkStub } from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = msg => msg;
VueTestUtils.config.mocks["$tc"] = msg => msg;
VueTestUtils.config.mocks["$i18n"] = { locale: "en" };

describe("Home.vue", () => {
  test("should show start button", () => {
    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub }
    });
    expect(wrapper.find(".welcome").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });
});
