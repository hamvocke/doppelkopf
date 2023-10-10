import { describe, expect, test } from "vitest";
import Card from "@/components/Card.vue";
import { ace, Suit } from "@/models/card";
import { mount, config } from "@vue/test-utils";

config.global.mocks["$t"] = (key: string) => key;
config.global.mocks["$tc"] = (key: string) => key;

describe("Card.vue", () => {
  test("should render correct contents", () => {
    const wrapper = mount(Card, {
      props: {
        card: ace.of(Suit.Hearts),
        isCovered: false,
      },
    });
    expect(wrapper.find(".card-top").text()).toBe("A♥");
    expect(wrapper.find(".card-center").text()).toBe("♥");
    expect(wrapper.find(".card-bottom").text()).toBe("A♥");
  });

  test("should render hearts suit red", () => {
    const wrapper = mount(Card, {
      props: {
        card: ace.of(Suit.Hearts),
        isCovered: false,
      },
    });
    expect(wrapper.find(".card-top").classes()).toContain("red");
    expect(wrapper.find(".card-top").classes()).not.toContain("black");
  });

  test("should render clubs suit black", () => {
    const wrapper = mount(Card, {
      props: {
        card: ace.of(Suit.Clubs),
        isCovered: false,
        side: false,
      },
    });
    expect(wrapper.find(".card-top").classes()).toContain("black");
    expect(wrapper.find(".card-top").classes()).not.toContain("red");
  });

  test("should render selected card", () => {
    const wrapper = mount(Card, {
      props: {
        card: ace.of(Suit.Spades),
        isSelected: true,
        isCovered: false,
      },
    });
    expect(wrapper.find(".card-inner").classes()).toContain("selected");
  });

  test("should apply position class", () => {
    const wrapper = mount(Card, {
      props: {
        card: ace.of(Suit.Spades),
        isSelected: true,
        position: "left",
      },
    });
    expect(wrapper.find(".card").classes()).toContain("left");
  });

  test("covered card should not show rank and suit", () => {
    const wrapper = mount(Card, {
      props: {
        card: ace.of(Suit.Spades),
        isSelected: false,
        isCovered: true,
      },
    });

    expect(wrapper.text()).not.toContain("A");
    expect(wrapper.text()).not.toContain("♥");
  });

  test("should render covered card", () => {
    const wrapper = mount(Card, {
      props: {
        card: ace.of(Suit.Spades),
        isCovered: true,
      },
    });

    expect(wrapper.find(".background").exists()).toBe(true);
  });
});
