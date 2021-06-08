import Table from "@/components/Table.vue";
import { Game } from "@/models/game";
import { Score } from "@/models/score";
import { Party, PartyName } from "@/models/party";
import { mount, config } from "@vue/test-utils";
import { Game as GameModel } from "@/models/game";

config.mocks["$t"] = (msg: string) => msg;
config.mocks["$tc"] = (msg: string) => msg;
config.mocks["$i18n"] = { locale: "en" };

let game: GameModel;

beforeEach(() => {
  game = Game.singlePlayer();
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

  test("should hide Scorecard if game is not finished", () => {
    const mockGame = Game.singlePlayer();
    mockGame.currentRound.isFinished = () => false;

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    expect(wrapper.find("div.scorecard").exists()).toBe(false);
  });

  test("should show Scorecard if game is finished", () => {
    const mockGame = Game.singlePlayer();
    game.players[0].points = () => 120;
    game.players[1].points = () => 120;
    const reParty = new Party(PartyName.Re, game.players[0], game.players[3]);
    const kontraParty = new Party(
      PartyName.Kontra,
      game.players[1],
      game.players[2]
    );
    const stubScore = new Score(reParty, kontraParty);
    stubScore.winner = () => reParty;
    mockGame.currentRound.score = stubScore;
    mockGame.currentRound.isFinished = () => true;

    const wrapper = mount(Table, { propsData: { game: mockGame } });

    expect(wrapper.find("div.scorecard").exists()).toBe(true);
  });
});
