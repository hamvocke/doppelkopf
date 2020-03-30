import Game from "@/views/Game";
import { Game as GameModel } from "@/models/game";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = msg => msg;
VueTestUtils.config.mocks["$tc"] = msg => msg;
VueTestUtils.config.mocks["$i18n"] = { locale: "en" };

describe("Game.vue", () => {
  test("should render Table", () => {
    const wrapper = mount(Game, {
      propsData: { game: GameModel.singlePlayer() }
    });

    expect(wrapper.find(".table").exists()).toBe(true);
    expect(wrapper.find(".welcome").exists()).toBe(false);
  });
});
