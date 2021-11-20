import Trick from "@/components/Trick.vue";
import { Game } from "@/models/game";
import { Trick as TrickModel } from "@/models/trick";
import { ace, Suit } from "@/models/card";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = () => {};
config.mocks["$tc"] = () => {};

let game: Game;
let trick: TrickModel;

beforeEach(() => {
  game = Game.singlePlayer();
  trick = game.currentTrick;
});

describe("Trick.vue", () => {
  test("should show empty trick on initialization", () => {
    const wrapper = mount(Trick, { propsData: { trick: trick } });
    expect(wrapper.findAll("div.card").length).toEqual(0);
  });

  test("should render cards in current trick", () => {
    trick.add(ace.of(Suit.Hearts), game.players[0]);

    const wrapper = mount(Trick, { propsData: { trick: trick } });

    expect(wrapper.findAll("div.card").length).toEqual(1);
  });

  test("should highlight base and winning card current trick", () => {
    trick.add(ace.of(Suit.Hearts), game.players[0]);
    trick.add(ace.of(Suit.Diamonds), game.players[1]);

    const wrapper = mount(Trick, {
      propsData: { trick: trick, highlightCards: true }
    });

    expect(wrapper.find("div.card-inner.winner").exists()).toBe(true);
    expect(wrapper.find("div.card-inner.basecard").exists()).toBe(true);
    expect(wrapper.find("div.card-inner.basewin").exists()).toBe(false);
  });

  test("should highlight basecard being the winning card", () => {
    trick.add(ace.of(Suit.Hearts), game.players[0]);

    const wrapper = mount(Trick, {
      propsData: { trick: trick, highlightCards: true }
    });

    expect(wrapper.find("div.card-inner.winner").exists()).toBe(false);
    expect(wrapper.find("div.card-inner.basecard").exists()).toBe(false);
    expect(wrapper.find("div.card-inner.basewin").exists()).toBe(true);
  });
});
