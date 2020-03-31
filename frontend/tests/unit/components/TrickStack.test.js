import TrickStack from "@/components/TrickStack";
import { TrickStack as TrickStackModel } from "@/models/trickStack";
import { Trick } from "@/models/trick";
import { Player } from "@/models/player";
import { ace, queen, suits } from "@/models/card";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = () => {};
VueTestUtils.config.mocks["$tc"] = () => {};

const player1 = new Player("player 1");
const player2 = new Player("player 2");
const trick = new Trick(2);
trick.add(ace.of(suits.hearts), player1);
trick.add(queen.of(suits.spades), player2);

describe("TrickStack.vue", () => {
  test("should show placeholder if player has no trick", () => {
    const emptyTrickStack = new TrickStackModel();
    const wrapper = mount(TrickStack, {
      propsData: { trickStack: emptyTrickStack }
    });
    expect(wrapper.find(".placeholder").exists()).toBe(true);
  });

  test("should not show placeholder if player has a trick", () => {
    const trickStack = new TrickStackModel();
    trickStack.add(trick);
    const wrapper = mount(TrickStack, {
      propsData: { trickStack: trickStack }
    });
    expect(trick.playedCards).toHaveLength(2);
    expect(wrapper.find("div.trickStack").exists()).toBe(true);
    expect(wrapper.findAll("div.card")).toHaveLength(1);
    expect(wrapper.find(".placeholder").exists()).toBe(false);
  });

  test("should display number of won tricks", () => {
    const trickStack = new TrickStackModel();
    trickStack.add(trick);
    trickStack.add(trick);
    const wrapper = mount(TrickStack, {
      propsData: { trickStack: trickStack }
    });
    expect(wrapper.find(".trickCount").exists()).toBe(true);
  });
});
