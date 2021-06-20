import { Player } from "@/models/player";
import WaitingRoom from "@/views/WaitingRoom.vue";
import { config, shallowMount } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

const websocketSpy = {
  connect: jest.fn(),
  emit: jest.fn(),
  on: jest.fn()
};

beforeEach(() => {
  websocketSpy.connect.mockClear();
  websocketSpy.emit.mockClear();
  websocketSpy.on.mockClear();
});

describe("WaitingRoom.vue", () => {
  test("should render loading state", async () => {
    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({
        isLoading: true,
        error: undefined,
        socket: websocketSpy
      })
    });

    await wrapper.setData({ isLoading: true });

    expect(wrapper.find(".loading").exists()).toBe(true);
    expect(wrapper.find(".error").exists()).toBe(false);
    expect(wrapper.find(".wrapper").exists()).toBe(false);
  });

  test("should render error state", async () => {
    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({
        isLoading: false,
        socket: websocketSpy,
        error: "some error"
      })
    });

    await wrapper.setData({ error: "some error", isLoading: false });

    expect(wrapper.find(".loading").exists()).toBe(false);
    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".wrapper").exists()).toBe(false);
  });

  test("should render players", async () => {
    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({
        isLoading: false,
        error: undefined,
        socket: websocketSpy,
        players: [new Player("some player", true)]
      })
    });

    await wrapper.setData({ error: undefined, isLoading: false });


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
