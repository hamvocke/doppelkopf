import Trick from "@/components/Trick";
import { Game } from "@/models/game";
import { ace, suits } from "@/models/card";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = () => {};
config.mocks["$tc"] = () => {};

let game;
let trick;

beforeEach(() => {
  game = Game.singlePlayer();
  trick = game.currentTrick;
});

describe("Trick.vue", () => {
  test("should show empty trick on initialization", () => {
    const wrapper = mount(Trick, { propsData: { currentTrick: trick } });
    expect(wrapper.findAll("div.card").length).toEqual(0);
  });

  test("should render cards in current trick", () => {
    trick.add(ace.of(suits.hearts), game.players[0]);

    const wrapper = mount(Trick, { propsData: { currentTrick: trick } });

    expect(wrapper.findAll("div.card").length).toEqual(1);
  });

  test("should render winner", () => {
    trick.add(ace.of(suits.hearts), game.players[0]);

    const wrapper = mount(Trick, { propsData: { currentTrick: trick } });

    expect(wrapper.find("div.winner").text()).toContain(game.players[0].name);
  });

  test("should not render winner if trick is empty", () => {
    const wrapper = mount(Trick, { propsData: { currentTrick: trick } });

    expect(wrapper.find("div.winner").exists()).toBe(false);
  });
});
