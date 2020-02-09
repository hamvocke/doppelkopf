import { Score } from "@/models/score";
import { Player } from "@/models/player";
import { re, kontra } from "@/models/parties";
import {
  WIN,
  BEAT_RE,
  DOPPELKOPF,
  FOX,
  NO_90,
  NO_60,
  NO_30
} from "@/models/extras";

const playersWithReWinning = stubParties(130, 110);
const playersWithKontraWinning = stubParties(110, 130);

function stubParties(rePoints, kontraPoints) {
  return [
    stubPlayer("Player 1", re, rePoints / 2),
    stubPlayer("Player 2", re, rePoints / 2),
    stubPlayer("Player 3", kontra, kontraPoints / 2),
    stubPlayer("Player 4", kontra, kontraPoints / 2)
  ];
}

function stubPlayer(name, party, points) {
  const stubbedPlayer = new Player(name);
  stubbedPlayer.isRe = () => party === re;
  stubbedPlayer.points = () => points;
  stubbedPlayer.isKontra = () => party !== re;
  return stubbedPlayer;
}

describe("evaluate score", () => {
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
});

describe("calculating extras", () => {
  test("should start without extras", () => {
    const score = new Score();
    expect(score.listExtras(re)).toEqual([]);
    expect(score.listExtras(kontra)).toEqual([]);
  });

  test("should give 1 point if nothing else happens", () => {
    const score = new Score();

    score.evaluate(playersWithReWinning);

    expect(score.points()).toBe(1);
  });

  test("should give subtract losing party's points", () => {
    const score = new Score();

    playersWithReWinning[2].trickStack.extras = () => [DOPPELKOPF];
    score.evaluate(playersWithReWinning);

    expect(score.points()).toBe(0);
    expect(score.listExtras(re)).toEqual([WIN]);
    expect(score.listExtras(kontra)).toEqual([DOPPELKOPF]);
  });

  test("should add extra point", () => {
    const score = new Score();

    score.addExtra(re, WIN);

    const expectedExtras = [WIN];
    expect(score.listExtras(re)).toEqual(expectedExtras);
  });

  test("should give extra point if kontra wins against re", () => {
    const score = new Score();

    score.evaluate(playersWithKontraWinning);

    expect(score.points()).toBe(2);
  });

  test("should add no 90 extra", () => {
    const score = new Score();

    score.evaluate(stubParties(89, 240 - 89));

    expect(score.points()).toBe(3); // won, beat re, no 90
    expect(score.listExtras(kontra)).toContain(NO_90);
  });

  test("should add no 60 extra", () => {
    const score = new Score();

    score.evaluate(stubParties(240 - 59, 59));

    expect(score.points()).toBe(3); // won, no 90, no 60
    expect(score.listExtras(re)).toContain(NO_60);
  });

  test("should add no 30 extra", () => {
    const score = new Score();

    score.evaluate(stubParties(29, 240 - 29));

    expect(score.points()).toBe(5); // won, beat re, no 90, no 60, no 30
    expect(score.listExtras(kontra)).toContain(NO_30);
  });

  test("should add no points extra", () => {
    const score = new Score();

    score.evaluate(stubParties(240, 0));

    expect(score.points()).toBe(5); // won, no 90, no 60, no 30, no points
    expect(score.listExtras(re)).toContain(NO_30);
  });

  test("should list doppelkopf extra", () => {
    const score = new Score();
    playersWithKontraWinning[2].trickStack.extras = () => [DOPPELKOPF];

    score.evaluate(playersWithKontraWinning);

    expect(score.points()).toBe(3);
    expect(score.listExtras(kontra)).toContain(DOPPELKOPF);

    playersWithKontraWinning[2].trickStack.extras = () => [];
  });

  test("should list extra points for both parties", () => {
    const score = new Score();

    score.evaluate(playersWithKontraWinning);

    const expectedExtrasForKontra = [WIN, BEAT_RE];
    expect(score.listExtras(re)).toEqual([]);
    expect(score.listExtras(kontra)).toEqual(expectedExtrasForKontra);
  });

  test("should list extra from tricks parties", () => {
    const score = new Score();
    let playerConstellation = playersWithKontraWinning;
    playerConstellation[2].trickStack.extras = () => [DOPPELKOPF, FOX];

    score.evaluate(playerConstellation);

    const expectedExtrasForKontra = [WIN, BEAT_RE, DOPPELKOPF, FOX];
    expect(score.listExtras(re)).toEqual([]);
    expect(score.listExtras(kontra)).toEqual(expectedExtrasForKontra);
  });
});
