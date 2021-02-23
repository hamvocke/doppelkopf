import Hand from "@/components/Hand";
import { ace, queen, Suit } from "@/models/card";
import { Hand as HandModel } from "@/models/hand";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = () => {};
config.mocks["$tc"] = () => {};

const reHand = new HandModel([
  queen.of(Suit.Clubs),
  ace.of(Suit.Hearts),
  ace.of(Suit.Hearts),
  ace.of(Suit.Clubs)
]);

const kontraHand = new HandModel([
  ace.of(Suit.Hearts),
  ace.of(Suit.Hearts),
  ace.of(Suit.Clubs)
]);

describe("Hand.vue", () => {
  test("should render each card", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: reHand, playableCards: reHand.cards }
    });
    expect(wrapper.findAll("div.card").length).toBe(4);
  });

  it("should render card position", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: reHand, playableCards: [], position: "left" }
    });
    expect(wrapper.find("div.cards").classes()).toContain("left");
  });

  test("should render cards covered", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: reHand, playableCards: [], isCovered: true }
    });
    const firstCard = wrapper.findAll("div.card").at(0);
    expect(firstCard.find("div.background").exists()).toBe(true);
  });

  test("should render placeholder card if hand is empty", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: new HandModel([]), playableCards: [], isCovered: true }
    });
    expect(wrapper.find("div.placeholder").exists()).toBe(true);
  });

  test("should not render placeholder card if hand has cards", () => {
    const wrapper = mount(Hand, {
      propsData: {
        hand: new HandModel([ace.of(Suit.Hearts)]),
        playableCards: [],
        isCovered: true
      }
    });
    expect(wrapper.find("div.placeholder").exists()).toBe(false);
  });

  test("should keep track of selected card", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: kontraHand, playableCards: [], isSelectable: true }
    });
    const cardToBeSelected = kontraHand.cards[0];
    wrapper.vm.select(cardToBeSelected);
    expect(wrapper.vm.selectedCard).toEqual(cardToBeSelected);
  });

  test("clicking on card should select card", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: kontraHand, playableCards: [], isSelectable: true }
    });
    wrapper
      .findAll("div.card")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.selectedCard).toEqual(kontraHand.cards[0]);
  });

  test("trigger play event when clicking on already selected card", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: kontraHand, playableCards: [], isSelectable: true }
    });
    const card = kontraHand.cards[1];

    wrapper.vm.select(card);
    wrapper.vm.select(card);

    expect(wrapper.emitted().play.length).toBe(1);
  });

  test("should not select cards if hand is marked as not selectable", () => {
    const wrapper = mount(Hand, {
      propsData: { hand: kontraHand, playableCards: [], selectable: false }
    });
    wrapper
      .findAll("div.card")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.selectedCard).toEqual({});
  });
});
