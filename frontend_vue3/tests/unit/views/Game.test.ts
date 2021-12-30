import Game from "@/views/Game.vue";
import { Game as GameModel } from "@/models/game";
import { mount, config } from "@vue/test-utils";

config.global.mocks["$t"] = (msg: string) => msg;
config.global.mocks["$tc"] = (msg: string) => msg;
config.global.mocks["$i18n"] = { locale: "en" };

describe("Game.vue", () => {
  test("should render Table", () => {
    const wrapper = mount(Game, {
      props: { game: GameModel.singlePlayer() }
    });

    expect(wrapper.find(".table").exists()).toBe(true);
    expect(wrapper.find(".welcome").exists()).toBe(false);
  });
});
