import Game from "@/views/Game";
import { Game as GameModel } from "@/models/game";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = msg => msg;
config.mocks["$tc"] = msg => msg;
config.mocks["$i18n"] = { locale: "en" };

describe("Game.vue", () => {
  test("should render Table", () => {
    const wrapper = mount(Game, {
      propsData: { game: GameModel.singlePlayer() }
    });

    expect(wrapper.find(".table").exists()).toBe(true);
    expect(wrapper.find(".welcome").exists()).toBe(false);
  });
});
