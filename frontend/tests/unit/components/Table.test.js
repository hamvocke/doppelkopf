import Table from "@/components/Table";
import { Game } from "@/models/game";
import { Score } from "@/models/score";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = (msg) => msg;
VueTestUtils.config.mocks["$i18n"] = { locale: "en" };

let game;

beforeEach(() => {
  game = new Game();
});

describe("Table.vue", () => {
  test("should render players", () => {
    const wrapper = mount(Table, { propsData: { game: game } });
    expect(wrapper.findAll("div.player")).toHaveLength(4);
  });

  test("should render trick", () => {
    const wrapper = mount(Table, { propsData: { game: game } });
    expect(wrapper.find("div.trick").exists()).toBe(true);
  });

  test("should render controls", () => {
    const wrapper = mount(Table, { propsData: { game: game } });
    expect(wrapper.find("div.controls").exists()).toBe(true);
  });

  test("should handle nextMove", () => {
    const mockGame = new Game();
    mockGame.currentRound.nextMove = jest.fn();

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    wrapper.vm.nextMove();

    expect(mockGame.currentRound.nextMove).toBeCalled();
  });

  test("should handle finishRound", () => {
    const mockGame = new Game();
    mockGame.currentRound.finishRound = jest.fn();

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    wrapper.vm.finishRound();

    expect(mockGame.currentRound.finishRound).toBeCalled();
  });

  test("should handle finishTrick event", () => {
    const mockGame = new Game();
    mockGame.currentRound.finishTrick = jest.fn();

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    wrapper.vm.finishTrick();

    expect(mockGame.currentRound.finishTrick).toBeCalled();
  });

  test("should hide Scorecard if game is not finished", () => {
    const mockGame = new Game();
    mockGame.currentRound.isFinished = () => false;

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    expect(wrapper.find("div.scorecard").exists()).toBe(false);
  });

  test("should show Scorecard if game is finished", () => {
    const mockGame = new Game();
    game.players[0].points = () => 120;
    game.players[1].points = () => 120;
    const stubScore = new Score(game.players);
    stubScore.winner = () => [game.players[0], game.players[3]];
    mockGame.currentRound.score = stubScore;
    mockGame.currentRound.isFinished = () => true;

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    expect(wrapper.find("div.scorecard").exists()).toBe(true);
  });

  test("should handle nextRound event", () => {
    const mockGame = new Game();
    mockGame.nextRound = jest.fn();

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    wrapper.vm.nextRound();

    expect(mockGame.nextRound).toBeCalled();
  });
});
