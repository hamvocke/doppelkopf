import { CreateResponse } from "@/helpers/multiplayerHandler";
import { Player } from "@/models/player";
import WaitingRoom from "@/views/WaitingRoom.vue";
import { config, shallowMount } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("WaitingRoom.vue", () => {
  test("should render loading state", async () => {
    const multiplayerHandlerMock = {
      fetchRoom: jest.fn().mockRejectedValue(new Error("something failed"))
    };

    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({ multiplayerHandler: multiplayerHandlerMock })
    });

    await wrapper.setData({
      isLoading: true,
      error: undefined
    });

    expect(wrapper.find(".loading").exists()).toBe(true);
    expect(wrapper.find(".error").exists()).toBe(false);
    expect(wrapper.find(".wrapper").exists()).toBe(false);
  });

  test("should render error state", async () => {
    const multiplayerHandlerMock = {
      fetchRoom: jest.fn().mockRejectedValue(new Error("something failed"))
    };

    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({ multiplayerHandler: multiplayerHandlerMock }),
      created: jest.fn()
    });

    await wrapper.setData({
      isLoading: false,
      error: "some error"
    });

    expect(wrapper.find(".loading").exists()).toBe(false);
    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".wrapper").exists()).toBe(false);
  });

  test("should render players", async () => {
    const mockedResponse: CreateResponse = {
      game: {
        id: "some-game",
        players: [{ name: "some player" }]
      }
    };

    const multiplayerHandlerMock = {
      fetchRoom: jest.fn().mockResolvedValue(mockedResponse)
    };

    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({ multiplayerHandler: multiplayerHandlerMock }),
      created: jest.fn()
    });

    await wrapper.setData({
      isLoading: false,
      error: undefined,
      players: [new Player("some player", true)]
    });

    expect(wrapper.find(".loading").exists()).toBe(false);
    expect(wrapper.find(".error").exists()).toBe(false);
    expect(wrapper.find(".wrapper").exists()).toBe(true);
    expect(
      wrapper
        .findAll(".players .player")
        .at(0)
        .text()
    ).toEqual("some player");
  });
});
