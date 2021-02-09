import Home from "@/views/Home";
import { Features } from "@/models/features";
import { shallowMount, config } from "@vue/test-utils";
import { RouterLinkStub } from "@vue/test-utils";

config.mocks["$t"] = msg => msg;
config.mocks["$tc"] = msg => msg;
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
    Features.features = {
      "game.tutorial.enable": false,
      "game.multiplayer.enable": false
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub },
      propsData: { showTutorial: false }
    });
    expect(wrapper.find(".tutorial-link").exists()).toBe(true);
  });

  test("should show multiplayer game button if feature is enabled", () => {
    Features.features = {
      "game.tutorial.enable": false,
      "game.multiplayer.enable": true
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub }
    });

    expect(wrapper.find(".start-multiplayer").exists()).toBe(true);
  });

  test("should hide multiplayer game button if feature is disabled", () => {
    Features.features = {
      "game.tutorial.enable": false,
      "game.multiplayer.enable": false
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub }
    });

    expect(wrapper.find(".start-multiplayer").exists()).toBe(false);
  });
});
