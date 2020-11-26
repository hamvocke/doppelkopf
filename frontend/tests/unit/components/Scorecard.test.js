import Scorecard from "@/components/Scorecard";
import { Scorecard as ScorecardModel } from "@/models/scorecard";
import { Player } from "@/models/player";
import { re, kontra } from "@/models/party";
import { extras } from "@/models/extras";
import { ScoreBuilder } from "../../builders/scoreBuilder";
import { mount } from "@vue/test-utils";
import VueTestUtils from "@vue/test-utils";

VueTestUtils.config.mocks["$t"] = key => key;
VueTestUtils.config.mocks["$tc"] = msg => msg;

let players;
let score;
let scorecard;

function stubScoreHumanPlayerWins() {
  players = [
    stubPlayer("Player 1", re, 60),
    stubPlayer("Player 2", re, 61),
    stubPlayer("Player 3", kontra, 59),
    stubPlayer("Player 4", kontra, 60)
  ];
  scorecard = new ScorecardModel(players);
  score = new ScoreBuilder()
    .withWinners(re, players[0], players[1])
    .withLosers(kontra, players[2], players[3])
    .withReExtras([extras.win, extras.announced_re, extras.fox])
    .withKontraExtras([])
    .withPoints(2)
    .build();
}

function stubPlayer(name, party, points) {
  const stubbedPlayer = new Player(name);
  stubbedPlayer.isRe = () => party === re;
  stubbedPlayer.isKontra = () => party !== re;
  stubbedPlayer.points = () => points;
  return stubbedPlayer;
}

beforeEach(() => {
  players = [
    stubPlayer("Player 1", re, 60),
    stubPlayer("Player 2", re, 59),
    stubPlayer("Player 3", kontra, 60),
    stubPlayer("Player 4", kontra, 61)
  ];

  scorecard = new ScorecardModel(players);
  score = new ScoreBuilder()
    .withWinners(kontra, players[2], players[3])
    .withLosers(re, players[0], players[1])
    .withKontraExtras([extras.win, extras.announced_re])
    .withReExtras([extras.fox])
    .withPoints(2)
    .build();
});

describe("Scorecard.vue", () => {
  it("should display scorecard", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    expect(wrapper.find("table").exists()).toBe(true);
  });

  it("should display next round button", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    expect(wrapper.find("button.next-round").exists()).toBe(true);
  });

  test("should emit next round event if next round button is clicked", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });
    wrapper.find("button.next-round").trigger("click");

    expect(wrapper.emitted().nextRound).toHaveLength(1);
  });

  it("should show 'you won' message when player won", () => {
    stubScoreHumanPlayerWins();
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    expect(wrapper.find("h1.message").text()).toContain("you_win");
  });

  it.skip("should show 'you lose' message when player lost", () => {
    score = new ScoreBuilder()
      .withWinners(kontra, players[2], players[3])
      .withLosers(re, players[0], players[1])
      .withPoints(2)
      .build();

    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    expect(wrapper.find("h1.message").text()).toContain("you_lose");
  });

  it("should make last scoreline bold", () => {
    scorecard.addScore(
      new ScoreBuilder()
        .withWinners(re, players[0], players[1])
        .withLosers(kontra, players[2], players[3])
        .withPoints(2)
        .build()
    );

    scorecard.addScore(
      new ScoreBuilder()
        .withWinners(re, players[1], players[3])
        .withLosers(kontra, players[2], players[0])
        .withPoints(4)
        .build()
    );

    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    const scorelines = wrapper.findAll(".scoreLine");
    expect(scorelines).toHaveLength(2);
    expect(scorelines.at(0).classes("bold")).toBe(false);
    expect(scorelines.at(1).classes("bold")).toBe(true);
  });

  it("should show points", () => {
    scorecard.addScore(
      new ScoreBuilder()
        .withWinners(re, players[0], players[1])
        .withLosers(kontra, players[2], players[3])
        .withPoints(2)
        .build()
    );

    scorecard.addScore(
      new ScoreBuilder()
        .withWinners(re, players[1], players[3])
        .withLosers(kontra, players[2], players[0])
        .withPoints(4)
        .build()
    );

    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    const scorelines = wrapper.findAll(".scoreLine");
    expect(scorelines).toHaveLength(2);
    expect(
      scorelines
        .at(0)
        .text()
        .replace(/\s*/g, "")
    ).toEqual("22-2-22");
    expect(
      scorelines
        .at(1)
        .text()
        .replace(/\s*/g, "")
    ).toEqual("-26-624");
  });

  it("should show extras list", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    const kontraExtrasList = wrapper.findAll(".extras .kontra");
    expect(wrapper.find(".extras").exists()).toBe(true);
    expect(kontraExtrasList.exists()).toBe(true);
    expect(kontraExtrasList).toHaveLength(2);
    expect(kontraExtrasList.at(0).text()).toContain("win");
  });

  it("should show sum of scores for winning party", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: score
      }
    });

    const sumKontra = wrapper.find(".sum.kontra");
    expect(sumKontra.exists()).toBe(true);
    expect(sumKontra.text()).toContain("2");
    expect(wrapper.find(".sum.re").text()).toBe("");
  });
});
