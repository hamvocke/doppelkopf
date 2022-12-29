import Reservations from "@/views/Reservations.vue";
import { Game as GameModel } from "@/models/game";
import { mount, config } from "@vue/test-utils";

config.global.mocks["$t"] = (msg: string) => msg;
config.global.mocks["$tc"] = (msg: string) => msg;
config.global.mocks["$i18n"] = { locale: "en" };

describe("Reservations.vue", () => {
  test("should render Hand", () => {
    const wrapper = mount(Reservations, {
      props: { game: GameModel.singlePlayer() },
    });

    expect(wrapper.find(".hand").exists()).toBe(true);
  });
});
