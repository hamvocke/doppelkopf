import Home from "@/views/Home.vue";
import { Features } from "@/models/features";
import { shallowMount, config } from "@vue/test-utils";
import { RouterLinkStub } from "@vue/test-utils";

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
        enableAnnouncements: false
      };
    };

    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub },
      propsData: { showTutorial: false }
    });
    expect(wrapper.find(".tutorial-link").exists()).toBe(true);
  });

  test("should save player name", async () => {
    const wrapper = shallowMount(Home, {
      stubs: { "router-link": RouterLinkStub }
    });

    const nameInput = wrapper.find("#player-name");
    await nameInput.setValue("my name");
    await nameInput.trigger("blur");

    expect(localStorage.getItem("name")).toEqual("my name");
  });
});
