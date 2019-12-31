import Home from "@/views/Home";
import { shallowMount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";
import { Features } from "@/models/features";
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
    expect(wrapper.find("button.start-game").exists()).toBe(true);
  });

  test("should show tutorial link when feature is disabled", () => {
    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub },
      propsData: { showTutorial: false }
    });
    expect(wrapper.find(".tutorial-link").exists()).toBe(true);
  });
});
