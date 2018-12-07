import { Score } from "@/models/score";
import { Player } from "@/models/player";
import { re, kontra } from "@/models/parties";

const playersWithReWinning = [
  stubPlayer("Player 1", re, 70),
  stubPlayer("Player 2", re, 60),
  stubPlayer("Player 3", kontra, 50),
  stubPlayer("Player 4", kontra, 60)
];

function stubPlayer(name, party, points) {
  const stubbedPlayer = new Player(name);
  stubbedPlayer.isRe = () => party === re;
  stubbedPlayer.isKontra = () => party !== re;
  stubbedPlayer.points = () => points;
  return stubbedPlayer;
}

describe("score", () => {
  test("should have score for each party", () => {
    const score = new Score();

    score.evaluate(playersWithReWinning);

    expect(score.rePoints).toBe(130);
    expect(score.kontraPoints).toEqual(110);
  });

  test("should return players for each party", () => {
    const score = new Score();
    score.evaluate(playersWithReWinning);

    const expectedParties = {
      [re]: [playersWithReWinning[0], playersWithReWinning[1]],
      [kontra]: [playersWithReWinning[2], playersWithReWinning[3]]
    };

    expect(score.parties).toEqual(expectedParties);
  });

  test("should validate score", () => {
    function invalidScore() {
      new Score().evaluate([
        stubPlayer("Player 1", re, 60),
        stubPlayer("Player 2", re, 59),
        stubPlayer("Player 3", kontra, 60),
        stubPlayer("Player 4", kontra, 60)
      ]);
    }

    expect(invalidScore).toThrowError(
      `A score must have a total of 240 points`
    );
  });

  test("should declare Kontra as winner if both have 120 points and there are no announcements", () => {
    const players = [
      stubPlayer("Player 1", kontra, 60),
      stubPlayer("Player 2", re, 60),
      stubPlayer("Player 3", kontra, 60),
      stubPlayer("Player 4", re, 60)
    ];

    const score = new Score();
    score.evaluate(players);

    expect(score.winner()).toEqual([players[0], players[2]]);
  });

  test("should declare Re as winner", () => {
    const players = [
      stubPlayer("Player 1", kontra, 60),
      stubPlayer("Player 2", re, 61),
      stubPlayer("Player 3", kontra, 59),
      stubPlayer("Player 4", re, 60)
    ];
    const score = new Score();
    score.evaluate(players);

    expect(score.winner()).toEqual([players[1], players[3]]);
  });

  test("should return points won in this round", () => {
    const score = new Score();
    score.evaluate(playersWithReWinning);
    expect(score.points()).toBe(1);
  });
});
