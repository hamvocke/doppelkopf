import AnnouncementsButton from "@/components/AnnouncementsButton";
import { announcements } from "@/models/announcements";
import { Game } from "@/models/game";
import { mount, config } from "@vue/test-utils";

config.mocks["$t"] = () => {};
config.mocks["$tc"] = () => {};

let game;

beforeEach(() => {
  game = Game.singlePlayer();
});

describe("AnnouncementsButton.vue", () => {
  test("should hide announcements", () => {
    const wrapper = mount(AnnouncementsButton, {
      propsData: { player: game.players[0] }
    });

    expect(wrapper.find("button.toggle").exists()).toBe(true);
    expect(wrapper.find("div.dropdown").exists()).toBe(true);
    expect(wrapper.find("div.dropdown").isVisible()).toBe(false);
  });

  test("should show possible announcements if button is clicked", async () => {
    const wrapper = mount(AnnouncementsButton, {
      propsData: { player: game.players[0] }
    });

    await wrapper.find("button.toggle").trigger("click");

    expect(wrapper.find("div.dropdown").isVisible()).toBe(true);
  });

  test("should hide possible announcements after announcing", async () => {
    let player = game.players[0];
    player.possibleAnnouncements = () => [announcements.re];
    const wrapper = mount(AnnouncementsButton, {
      propsData: { player: player }
    });

    await wrapper.find("button.toggle").trigger("click");
    wrapper.find("div.dropdown button:first-child").trigger("click");

    expect(wrapper.find("div.dropdown").isVisible()).toBe(false);
  });

  test("should hide entire button if no announcements can be made", () => {
    let player = game.players[0];
    player.possibleAnnouncements = () => [];

    const wrapper = mount(AnnouncementsButton, {
      propsData: { player: player }
    });

    expect(wrapper.find(".announcements-button").isVisible()).toBe(false);
  });
});
