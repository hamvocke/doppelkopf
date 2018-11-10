import WelcomeScreen from "@/components/WelcomeScreen";
import { Game } from "@/models/game";
import { mount } from "@vue/test-utils";

let game;

beforeEach(() => {
  game = new Game();
});

describe("WelcomeScreen.vue", () => {
  test("should show start button", () => {
    const wrapper = mount(WelcomeScreen, { propsData: { game: game } });
    expect(wrapper.find("button").exists()).toBe(true);
  });
});
