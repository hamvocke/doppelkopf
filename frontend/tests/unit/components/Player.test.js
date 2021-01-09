import Player from "@/components/Player";
import { Game } from "@/models/game";
import { ace, ten, suits } from "@/models/card";
import { mount, config } from "@vue/test-utils";
import { Trick } from "@/models/trick";

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

  test("should render winner", () => {
    /*  Define new instance of the game within this scope. */
    let game = Game.singlePlayer();
    const cards = [
      ten.of(suits.hearts),
      ace.of(suits.diamonds),
      ace.of(suits.diamonds),
      ten.of(suits.diamonds)
    ];

    game.players[0].hand.cards = [cards[0]];
    game.players[1].hand.cards = [cards[1]];
    game.players[2].hand.cards = [cards[2]];
    game.players[3].hand.cards = [cards[3]];

    game.players[0].play(game.players[0].hand.cards[0]);
    game.players[1].play(game.players[1].hand.cards[0]);
    game.players[2].play(game.players[2].hand.cards[0]);
    game.players[3].play(game.players[3].hand.cards[0]);
    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(wrapper.vm.winner).toBe(true);
    expect(wrapper.find(".winner").exists()).toBe(true);
  });

  test("should not render winner if trick isn't finished", () => {
    /*  Define new instance of the game within this scope. */
    let game = Game.singlePlayer();
    const cards = [
      ten.of(suits.hearts),
      ace.of(suits.diamonds),
      ace.of(suits.diamonds),
      ten.of(suits.diamonds)
    ];

    game.players[0].hand.cards = [cards[0]];
    game.players[1].hand.cards = [cards[1]];
    game.players[2].hand.cards = [cards[2]];
    game.players[3].hand.cards = [cards[3]];

    game.players[0].play(game.players[0].hand.cards[0]);
    game.players[1].play(game.players[1].hand.cards[0]);
    const wrapper = mount(Player, { propsData: { player: game.players[0] } });

    expect(wrapper.vm.winner).toBe(false);
    expect(wrapper.find(".winner").exists()).toBe(false);
  });
});
