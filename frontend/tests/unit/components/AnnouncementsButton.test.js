import AnnouncementsButton from "@/components/AnnouncementsButton";
import { Game } from "@/models/game";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = () => {};
VueTestUtils.config.mocks["$tc"] = () => {};

let game;

beforeEach(() => {
  game = Game.singlePlayer();
});

describe("AnnouncementsButton.vue", () => {
  test("should hide announcements", () => {
    const wrapper = mount(AnnouncementsButton, { propsData: { player: game.players[0] } });

    expect(wrapper.find("button.toggle").exists()).toBe(true);
    expect(wrapper.find("div.dropdown").exists()).toBe(true);
    expect(wrapper.find("div.dropdown").isVisible()).toBe(false);
  });


  test("should show possible announcements if button is clicked", () => {
    const wrapper = mount(AnnouncementsButton, { propsData: { player: game.players[0] } });

    wrapper.find("button.toggle").trigger("click");

    expect(wrapper.find("div.dropdown").isVisible()).toBe(true);
  });

  test("should hide possible announcements after announcing", () => {
    const wrapper = mount(AnnouncementsButton, { propsData: { player: game.players[0] } });

    wrapper.find("button.toggle").trigger("click");
    wrapper.find("div.dropdown button:first-child").trigger("click");

    expect(wrapper.find("div.dropdown").isVisible()).toBe(false);
  });
});
