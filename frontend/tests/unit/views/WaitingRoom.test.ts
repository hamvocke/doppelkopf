import WaitingRoom from "@/views/WaitingRoom.vue";
import { config, shallowMount } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("WaitingRoom.vue", () => {
  test("should render loading state", () => {
    const multiplayerHandlerMock = {
      fetchRoom: jest.fn().mockRejectedValue(new Error("something failed"))
    };

    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({
        isLoading: true,
        error: undefined,
        multiplayerHandler: multiplayerHandlerMock
      })
    });

    expect(wrapper.find(".loading").exists()).toBe(true);
    expect(wrapper.find(".error").exists()).toBe(false);
    expect(wrapper.find(".wrapper").exists()).toBe(false);
  });

  test.todo("should render waiting players");
  test.todo("should render loading errors");
});
