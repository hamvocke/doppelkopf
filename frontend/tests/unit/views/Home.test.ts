import Home from "@/views/Home.vue";
import { Features } from "@/models/features";
import { shallowMount, config } from "@vue/test-utils";
import { RouterLinkStub } from "@vue/test-utils";
import { Notifier } from "@/models/notifier";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

jest.useFakeTimers();

beforeEach(() => {
  jest.runAllTimers();
});

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

  test("should register new multiplayer game", () => {
    Features.get = () => {
      return {
        enableTutorial: false,
        enableMultiplayer: true,
        enableAnnouncements: false
      };
    };

    const multiplayerMock = {
      register: jest.fn()
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub },
      data() {
        return {
          multiplayerHandler: multiplayerMock
        };
      }
    });

    wrapper.find(".start-multiplayer").trigger("click");

    expect(multiplayerMock.register).toHaveBeenCalled();
  });

  test("should show error when multiplayer game creation fails", () => {
    Features.get = () => {
      return {
        enableTutorial: false,
        enableMultiplayer: true,
        enableAnnouncements: false
      };
    };

    const multiplayerMock = {
      register: () => {
        throw new Error("Ooops, backend is dead");
      }
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub },
      data() {
        return {
          multiplayerHandler: multiplayerMock
        };
      }
    });

    wrapper.find(".start-multiplayer").trigger("click");

    expect(new Notifier().notifications).toHaveLength(1);
  });
});
