import Player from "@/components/Player";
import { Game } from "@/models/game";
import { ace, suits } from "@/models/card";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = key => key;
config.mocks["$tc"] = msg => msg;

const game = Game.singlePlayer();

describe("Player.vue", () => {
  test("should display player's name", () => {
    game.players[0].name = "some player";
    const wrapper = mount(Player, { propsData: { player: game.players[0] } });
    expect(wrapper.find(".name").text()).toEqual("some player");
  });

  test("should play card", () => {
    const cards = [ace.of(suits.spades)];
    game.players[0].hand.cards = cards;
    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(game.players[0].hand.cards).toHaveLength(1);

    wrapper.vm.play(cards[0]);

    expect(game.players[0].hand.cards).toHaveLength(0);
  });

  test("should hide cards for computer player", () => {
    game.players[0].isHuman = false;
    game.players[0].hand.cards = [ace.of(suits.spades)];
    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(wrapper.vm.isCovered).toBe(true);
  });

  test("should make hand of computer player non-selectable", () => {
    game.players[0].isHuman = false;

    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(wrapper.vm.isHandSelectable).toBe(false);
  });

  test("should tell if hand is re", () => {
    game.players[0].isHuman = true;
    game.players[0].hand.isRe = () => true;

    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(wrapper.find("div.party").text()).toEqual("Re");
  });

  test("should tell if hand is kontra", () => {
    game.players[0].isHuman = true;
    game.players[0].hand.isRe = () => false;

    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(wrapper.find("div.party").text()).toEqual("Kontra");
  });

  test("should not show party for non-human player", () => {
    game.players[0].isHuman = false;
    game.players[0].hand.isRe = () => false;

    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(wrapper.find("div.party").exists()).toBe(false);
  });
});
