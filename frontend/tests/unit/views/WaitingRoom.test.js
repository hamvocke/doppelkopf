import WaitingRoom from "@/views/WaitingRoom";
import { WaitingRoom as WaitingRoomModel } from "@/models/waitingRoom";
import { Player } from "@/models/player";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = msg => msg;
config.mocks["$tc"] = msg => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("WaitingRoom.vue", () => {
  test("should render players", () => {
    const room = new WaitingRoomModel();
    room.join(new Player("Some Player"));

    const wrapper = mount(WaitingRoom, {
      propsData: { waitingRoom: room }
    });

    expect(wrapper.find(".players").exists()).toBe(true);
    expect(wrapper.findAll(".player")).toHaveLength(1);
  });

  test("should not render start button if room is waiting", () => {
    const room = new WaitingRoomModel();
    room.join(new Player("Some Player"));

    const wrapper = mount(WaitingRoom, {
      propsData: { waitingRoom: room }
    });

    expect(wrapper.find(".start-game").exists()).toBe(false);
  });

  test("should render start button if room is ready", () => {
    const room = new WaitingRoomModel();
    room.join(new Player("Some Player"));
    room.join(new Player("Some Player"));
    room.join(new Player("Some Player"));
    room.join(new Player("Some Player"));

    const wrapper = mount(WaitingRoom, {
      propsData: { waitingRoom: room }
    });

    expect(wrapper.find(".start-game").exists()).toBe(true);
  });

  test("should highlight own player", () => {
    const room = new WaitingRoomModel();
    room.join(new Player("Some Player", true, false));
    room.join(new Player("Me", true, true));

    const wrapper = mount(WaitingRoom, {
      propsData: { waitingRoom: room }
    });

    const myPlayer = wrapper.find(".players").findAll(".player.highlight");
    expect(myPlayer).toHaveLength(1);
    expect(myPlayer.at(0).text()).toEqual("Me");
  });
});
