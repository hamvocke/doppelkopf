import Home from "@/views/Home.vue";
import { shallowMount, config } from "@vue/test-utils";
import { RouterLinkStub } from "@vue/test-utils";

config.global.mocks["$t"] = (msg: string) => msg;
config.global.mocks["$tc"] = (msg: string) => msg;
config.global.mocks["$i18n"] = { locale: "en" };

jest.useFakeTimers();

beforeEach(() => {
  jest.runAllTimers();
});

describe("Home.vue", () => {
  test("should show start button", () => {
    const wrapper = shallowMount(Home, {
      global: { stubs: { "router-link": RouterLinkStub } },
    });

    expect(wrapper.find(".welcome").exists()).toBe(true);
    expect(wrapper.find(".start-game").exists()).toBe(true);
  });

  test("should save player name", async () => {
    const wrapper = shallowMount(Home, {
      global: { stubs: { "router-link": RouterLinkStub } },
    });

    const nameInput = wrapper.find("#player-name");
    await nameInput.setValue("my name");
    await nameInput.trigger("blur");

    expect(localStorage.getItem("name")).toEqual("my name");
  });
});
