import { Player } from "@/models/player";
import { WaitingRoom as WaitingRoomModel } from "@/models/waitingRoom";
import WaitingRoom from "@/views/WaitingRoom.vue";
import { config, shallowMount } from "@vue/test-utils";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("WaitingRoom.vue", () => {
  test("should render loading state", async () => {
    let waitingRoom = new WaitingRoomModel(1);
    waitingRoom.error = undefined;
    waitingRoom.isLoading = true;
    waitingRoom.players = [new Player("some player", true)];

    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({
        waitingRoom: waitingRoom
      })
    });

    expect(wrapper.find(".loading").exists()).toBe(true);
    expect(wrapper.find(".error").exists()).toBe(false);
    expect(wrapper.find(".wrapper").exists()).toBe(false);
  });

  test("should render error state", async () => {
    let waitingRoom = new WaitingRoomModel(1);
    waitingRoom.error = "some-error";
    waitingRoom.isLoading = false;
    waitingRoom.players = [];

    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({
        waitingRoom: waitingRoom
      })
    });

    expect(wrapper.find(".loading").exists()).toBe(false);
    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".wrapper").exists()).toBe(false);
  });

  test("should render players", async () => {
    let waitingRoom = new WaitingRoomModel(1);
    waitingRoom.error = undefined;
    waitingRoom.isLoading = false;
    waitingRoom.players = [new Player("some player", true)];

    const wrapper = shallowMount(WaitingRoom, {
      propsData: { gameName: "1" },
      data: () => ({
        waitingRoom: waitingRoom
      })
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
