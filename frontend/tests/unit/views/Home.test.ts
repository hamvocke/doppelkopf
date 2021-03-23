import Home from "@/views/Home.vue";
import { Features } from "@/models/features";
import { shallowMount, config } from "@vue/test-utils";
import { RouterLinkStub } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("Home.vue", () => {
  test("should show start button", () => {
    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub }
    });
    expect(wrapper.find(".welcome").exists()).toBe(true);
    expect(wrapper.find("button.start-game").exists()).toBe(true);
  });

  test("should show tutorial link when feature is disabled", () => {
    Features.get = () => {
      return {
        enableTutorial: false,
        enableMultiplayer: false,
        enableAnnouncements: false
      };
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub },
      propsData: { showTutorial: false }
    });
    expect(wrapper.find(".tutorial-link").exists()).toBe(true);
  });

  test("should show multiplayer game button if feature is enabled", () => {
    Features.get = () => {
      return {
        enableTutorial: false,
        enableMultiplayer: true,
        enableAnnouncements: false
      };
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub }
    });

    expect(wrapper.find(".start-multiplayer").exists()).toBe(true);
  });

  test("should hide multiplayer game button if feature is disabled", () => {
    Features.get = () => {
      return {
        enableTutorial: false,
        enableMultiplayer: false,
        enableAnnouncements: false
      };
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub }
    });

    expect(wrapper.find(".start-multiplayer").exists()).toBe(false);
  });

  test.todo("should start multiplayer game on click");
});
