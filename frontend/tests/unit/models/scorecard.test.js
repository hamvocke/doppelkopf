import { Scorecard, Scoreline } from "@/models/scorecard";
import { Player } from "@/models/player";

describe("Scorecard", () => {
  const players = [
    new Player("one"),
    new Player("two"),
    new Player("three"),
    new Player("four")
  ];
  const scorecard = new Scorecard(players);

  test("should play contain all players", () => {
    expect(scorecard.players).toHaveLength(4);
  });

  test("should initialize all players with 0 points", () => {
    expect(scorecard.scoreFor(players[0])).toBe(0);
    expect(scorecard.scoreFor(players[1])).toBe(0);
    expect(scorecard.scoreFor(players[2])).toBe(0);
    expect(scorecard.scoreFor(players[3])).toBe(0);
  });

  test("should calculate score line", () => {
    scorecard.addScore([players[0], players[3]], 4);

    expect(scorecard.lines[0]).toBeDefined();
    expect(scorecard.lines[0].points).toEqual(4);
    expect(scorecard.lines[0].winners).toEqual(players[0], players[3]);
    expect(scorecard.lines[0].score[players[0]]).toEqual(4);
    expect(scorecard.lines[0].score[players[2]]).toEqual(-4);
  });

  test("should calculate final scores", () => {
    scorecard.addScore([players[0], players[3]], 4);
    scorecard.addScore([players[1], players[3]], 2);

    expect(scorecard.scoreFor(players[0])).toBe(2);
    expect(scorecard.scoreFor(players[1])).toBe(-2);
    expect(scorecard.scoreFor(players[2])).toBe(-6);
    expect(scorecard.scoreFor(players[3])).toBe(6);
  });
});
