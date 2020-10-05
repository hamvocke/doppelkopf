import { Score } from "@/models/score";
import { Player } from "@/models/player";
import { re, kontra, Party } from "@/models/party";
import { extras } from "@/models/extras";
import { announcements } from "@/models/announcements";

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
      [re]: new Party(re, playersWithReWinning[0], playersWithReWinning[1]),
      [kontra]: new Party(
        kontra,
        playersWithReWinning[2],
        playersWithReWinning[3]
      )
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

    var expectedParty = new Party(kontra, players[0], players[2]);
    expect(score.winner()).toEqual(expectedParty);
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

    var expectedParty = new Party(re, players[1], players[3]);
    expect(score.winner()).toEqual(expectedParty);
  });
});

describe("calculating extras", () => {
  test("should have no extras by default", () => {
    const score = new Score();
    expect(score.listExtras(re)).toEqual([]);
    expect(score.listExtras(kontra)).toEqual([]);
  });

  test("should give 1 point if nothing else happens", () => {
    const score = new Score();

    score.evaluate(playersWithReWinning);

    expect(score.points()).toBe(1);
  });

  test("should subtract losing party's points", () => {
    const score = new Score();

    playersWithReWinning[2].trickStack.extras = () => [extras.doppelkopf];
    score.evaluate(playersWithReWinning);

    expect(score.points()).toBe(0);
    expect(score.listExtras(re)).toEqual([extras.win]);
    expect(score.listExtras(kontra)).toEqual([extras.doppelkopf]);
  });

  test("should add extra point", () => {
    const score = new Score();

    score.addExtra(re, extras.win);

    const expectedExtras = [extras.win];
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
    expect(score.listExtras(kontra)).toContain(extras.no_90);
  });

  test("should add no 60 extra", () => {
    const score = new Score();

    score.evaluate(stubParties(240 - 59, 59));

    expect(score.points()).toBe(3); // won, no 90, no 60
    expect(score.listExtras(re)).toContain(extras.no_60);
  });

  test("should add no 30 extra", () => {
    const score = new Score();

    score.evaluate(stubParties(29, 240 - 29));

    expect(score.points()).toBe(5); // won, beat re, no 90, no 60, no 30
    expect(score.listExtras(kontra)).toContain(extras.no_30);
  });

  test("should add no points extra", () => {
    const score = new Score();

    score.evaluate(stubParties(240, 0));

    expect(score.points()).toBe(5); // won, no 90, no 60, no 30, no points
    expect(score.listExtras(re)).toContain(extras.no_30);
  });

  test("should list doppelkopf extra", () => {
    const score = new Score();
    playersWithKontraWinning[2].trickStack.extras = () => [extras.doppelkopf];

    score.evaluate(playersWithKontraWinning);

    expect(score.points()).toBe(3);
    expect(score.listExtras(kontra)).toContain(extras.doppelkopf);

    playersWithKontraWinning[2].trickStack.extras = () => [];
  });

  test("should list extra points for both parties", () => {
    const score = new Score();

    score.evaluate(playersWithKontraWinning);

    const expectedExtrasForKontra = [extras.win, extras.beat_re];
    expect(score.listExtras(re)).toEqual([]);
    expect(score.listExtras(kontra)).toEqual(expectedExtrasForKontra);
  });

  test("should list extra from tricks", () => {
    const score = new Score();
    let playerConstellation = playersWithKontraWinning;
    playerConstellation[2].trickStack.extras = () => [
      extras.doppelkopf,
      extras.fox
    ];

    score.evaluate(playerConstellation);

    const expectedExtrasForKontra = [
      extras.win,
      extras.beat_re,
      extras.doppelkopf,
      extras.fox
    ];
    expect(score.listExtras(re)).toEqual([]);
    expect(score.listExtras(kontra)).toEqual(expectedExtrasForKontra);
  });
});

describe("announcements", () => {
  test("should add 1 point to the winning party's score for a right announcement", () => {
    const score = new Score();

    let playerConstellation = playersWithReWinning;
    playerConstellation[1].numberOfCardsLeft = () => 10;
    playerConstellation[1].announce(announcements.re);

    score.evaluate(playerConstellation);

    const expectedExtras = [extras.win, extras.announced_re];
    expect(score.listExtras(re)).toEqual(expectedExtras);
  });
});
