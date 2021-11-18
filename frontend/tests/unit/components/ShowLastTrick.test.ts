import ShowLastTrick from "@/components/ShowLastTrick.vue";
import { mount, config } from "@vue/test-utils";
import { Trick } from "@/models/trick";
import { Player } from "@/models/player";
import { ace, Suit } from "@/models/card";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

const p1 = new Player("1");
const p2 = new Player("2");
const p3 = new Player("3");
const p4 = new Player("4");
const players = [p1, p2, p3, p4];
let trick: Trick;

describe("ShowLastTrick.vue", () => {
  beforeEach(() => {
    trick = new Trick(players);
    trick.add(ace.of(Suit.Clubs), p1);
  });

  test("should show last trick icon", async () => {
    const wrapper = mount(ShowLastTrick, { propsData: { trick: trick } });

    await wrapper.setData({ visible: true });

    expect(trick.playedCards.length).toBe(1);
    expect(trick.winner()).toBe(p1);
    expect(wrapper.find(".icon.icon-rewind").exists()).toBe(true);
  });

  test("should not show options", async () => {
    const wrapper = mount(ShowLastTrick, { propsData: { trick: trick } });

    await wrapper.setData({ visible: false });

    expect(wrapper.find(".last-trick").exists()).toBe(false);
  });

  test("should show options", async () => {
    const wrapper = mount(ShowLastTrick, { propsData: { trick: trick } });

    await wrapper.setData({ visible: false });

    await wrapper.find(".icon.icon-rewind").trigger("click");

    expect(wrapper.find(".last-trick").exists()).toBe(true);
  });

  test("should contain last trick component", async () => {
    const wrapper = mount(ShowLastTrick, { propsData: { trick: trick } });

    await wrapper.setData({ visible: true });

    expect(wrapper.find(".last-trick-content .trick").exists()).toBe(true);
  });
});
