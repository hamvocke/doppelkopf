/* eslint-disable prettier/prettier */
import { NewScore } from "@/models/newScore";
import { kontra, re } from "../../../src/models/party";
import { extrasWithPoints as extras } from "@/models/extras";
import { announcements } from "@/models/announcements";
import { PartyBuilder } from "../../builders/partyBuilder";

describe("Score", () => {
  test("should throw error when evaluation not exactly 240 points", () => {
    const reParty = new PartyBuilder(re).withPoints(121).build();
    const kontraParty = new PartyBuilder(kontra).withPoints(121).build();

    const illegalScoreCall = () => new NewScore(reParty, kontraParty);

    expect(illegalScoreCall).toThrowError(
      "A score must have a total of 240 points. Got 121 for Re, 121 for Kontra"
    );
  });
});

describe("Score valuation", () => {
  describe("re party", () => {
    test("should win with more than 120 points", () => {
      const reParty = new PartyBuilder(re).withPoints(121).build();
      const kontraParty = new PartyBuilder(kontra).withPoints(119).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.losingPartyName()).toBe(kontra);
    });

    test("should win with 120 points if kontra party announced winning", () => {
      const reParty = new PartyBuilder(re).withPoints(120).build();
      const kontraParty = new PartyBuilder(kontra)
        .withPoints(120)
        .withAnnouncement(announcements.kontra)
        .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.losingPartyName()).toBe(kontra);
    });

    test("should lose with 120 points if both parties announced winning", () => {
      const reParty = new PartyBuilder(re)
        .withPoints(120)
        .withAnnouncement(announcements.re)
        .build();
      const kontraParty = new PartyBuilder(kontra)
        .withPoints(120)
        .withAnnouncement(announcements.kontra)
        .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.losingPartyName()).toBe(re);
    });

    test("should get 2 extra points for announcing 're'", () => {
      const reParty = new PartyBuilder(re)
        .withPoints(130)
        .withAnnouncement(announcements.re)
        .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(110).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.totalPoints()).toEqual(3); // 1 for winning, 2 for announcing
      expect([...score.listExtras(re)]).toEqual([extras.win, extras.announced_re]);
    });

    test("should get 2 points when kontra announced 'kontra'", () => {
      const reParty = new PartyBuilder(re).withPoints(140).build();
      const kontraParty = new PartyBuilder(kontra)
        .withPoints(100)
        .withAnnouncement(announcements.kontra)
        .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.totalPoints()).toEqual(3); // 1 for winning, 2 for announcing
      expect([...score.listExtras(re)]).toEqual([extras.win, extras.announced_kontra]);
    });
  });

  describe("kontra party", () => {
    test("should win with 120 points or more", () => {
      const reParty = new PartyBuilder(re).withPoints(120).build();
      const kontraParty = new PartyBuilder(kontra).withPoints(120).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.losingPartyName()).toBe(re);
    });

    test("should lose with 120 points when announcing 'kontra'", () => {
      const reParty = new PartyBuilder(re).withPoints(120).build();
      const kontraParty = new PartyBuilder(kontra)
        .withPoints(120)
        .withAnnouncement(announcements.kontra)
        .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.losingPartyName()).toBe(kontra);
    });

    test("should get 1 extra point for winning against 're'", () => {
      const reParty = new PartyBuilder(re).withPoints(110).build();
      const kontraParty = new PartyBuilder(kontra).withPoints(130).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.totalPoints()).toBe(2);
      expect([...score.listExtras(re)]).toEqual([]);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re
      ]);
    });

    test("should get 2 points for announcing 'kontra'", () => {
      const reParty = new PartyBuilder(re)
        .withPoints(100)
        .build();
      const kontraParty = new PartyBuilder(kontra)
        .withPoints(140)
        .withAnnouncement(announcements.kontra)
        .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toEqual(4); // 1 for winning, 1 for beating re, 2 for announcing
      expect([...score.listExtras(kontra)]).toEqual([extras.win, extras.beat_re, extras.announced_kontra]);
    });

    test("should get 2 points when re announced 're'", () => {
      const reParty = new PartyBuilder(re)
        .withPoints(100)
        .withAnnouncement(announcements.re)
        .build();
      const kontraParty = new PartyBuilder(kontra)
        .withPoints(140)
        .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toEqual(4); // 1 for winning, 1 for beating re, 2 for announcing
      expect([...score.listExtras(kontra)]).toEqual([extras.win, extras.beat_re, extras.announced_re]);
    });
  });

  describe("either party", () => {
    test("should get 1 point for winning", () => {
      const reParty = new PartyBuilder(re).withPoints(150).build();
      const kontraParty = new PartyBuilder(kontra).withPoints(90).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.totalPoints()).toBe(1);
      expect([...score.listExtras(re)]).toEqual([extras.win]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    const pointThresholds = [
      [151, [extras.win, extras.no_90]],
      [181, [extras.win, extras.no_90, extras.no_60]],
      [211, [extras.win, extras.no_90, extras.no_60, extras.no_30]],
      [240,  [extras.win, extras.no_90, extras.no_60, extras.no_30, extras.no_points]]
    ];

    test.each(pointThresholds)
    ("should get 1 extra point for getting %i points", (rePoints, expectedExtras) => {
      const reParty = new PartyBuilder(re).withPoints(rePoints).build();
      const kontraParty = new PartyBuilder(kontra).withPoints(240 - rePoints).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.totalPoints()).toBe(expectedExtras.length);
      expect([...score.listExtras(re)]).toEqual(expectedExtras);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test("should get 1 point for announcing 'no 90' and getting more than 150 points", () => {
      const reParty = new PartyBuilder(re)
        .withAnnouncement(announcements.re)
        .withAnnouncement(announcements.no_90)
        .withPoints(151)
        .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(240 - 151).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.totalPoints()).toBe(5);
      expect([...score.listExtras(re)]).toEqual([extras.win, extras.announced_re, extras.no_90, extras.announced_no_90]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test("should get 1 point for announcing 'no 60' and getting more than 180 points", () => {
      const reParty = new PartyBuilder(re).withPoints(240 - 181).build();
      const kontraParty = new PartyBuilder(kontra)
        .withAnnouncement(announcements.kontra)
        .withAnnouncement(announcements.no_90)
        .withAnnouncement(announcements.no_60)
        .withPoints(181)
        .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.totalPoints()).toBe(8);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re,
        extras.announced_kontra,
        extras.no_90,
        extras.announced_no_90,
        extras.no_60,
        extras.announced_no_60
      ]);
      expect([...score.listExtras(re)]).toEqual([]);
    });

    test("should get 1 point for announcing 'no 30' and getting more than 210 points", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withAnnouncement(announcements.no_30)
      .withPoints(211)
      .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(240 - 211).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.totalPoints()).toBe(9);
      expect([...score.listExtras(re)]).toEqual([
        extras.win,
        extras.announced_re,
        extras.no_90,
        extras.announced_no_90,
        extras.no_60,
        extras.announced_no_60,
        extras.no_30,
        extras.announced_no_30
      ]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test("should get 1 point for announcing 'no points' and getting 240 points", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withAnnouncement(announcements.no_30)
      .withAnnouncement(announcements.no_points)
      .withPoints(240)
      .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(0).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.totalPoints()).toBe(11);
      expect([...score.listExtras(re)]).toEqual([
        extras.win,
        extras.announced_re,
        extras.no_90,
        extras.announced_no_90,
        extras.no_60,
        extras.announced_no_60,
        extras.no_30,
        extras.announced_no_30,
        extras.no_points,
        extras.announced_no_points
      ]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test("should lose with less than 151 points when announcing 'no 90'", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withPoints(150)
      .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(90).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toBe(5); // all points go to winning party
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re,
        extras.announced_re,
        extras.opposing_party_announced_no_90,
      ]);
      expect([...score.listExtras(re)]).toEqual([]);
    });

    test("should lose with less than 181 points when announcing 'no 60'", () => {
      const kontraParty = new PartyBuilder(kontra)
      .withAnnouncement(announcements.kontra)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withPoints(180)
      .build();
      const reParty = new PartyBuilder(re).withPoints(60).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.totalPoints()).toBe(5);
      expect([...score.listExtras(re)]).toEqual([
        extras.win,
        extras.announced_kontra,
        extras.opposing_party_announced_no_90,
        extras.opposing_party_announced_no_60,
      ]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test("should lose with less than 211 points when announcing 'no 30'", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withAnnouncement(announcements.no_30)
      .withPoints(210)
      .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(30).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toBe(7);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re,
        extras.announced_re,
        extras.opposing_party_announced_no_90,
        extras.opposing_party_announced_no_60,
        extras.opposing_party_announced_no_30,
      ]);
      expect([...score.listExtras(re)]).toEqual([]);
    });

    test("should lose with less than 240 points when announcing 'no points'", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withAnnouncement(announcements.no_30)
      .withAnnouncement(announcements.no_points)
      .withPoints(239)
      .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(1).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toBe(8);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re,
        extras.announced_re,
        extras.opposing_party_announced_no_90,
        extras.opposing_party_announced_no_60,
        extras.opposing_party_announced_no_30,
        extras.opposing_party_announced_no_points,
      ]);
      expect([...score.listExtras(re)]).toEqual([]);
    });


    test("should get 1 point when getting 120 points against a 'no 90' announcement", () => {
      const kontraParty = new PartyBuilder(kontra)
      .withAnnouncement(announcements.kontra)
      .withAnnouncement(announcements.no_90)
      .withPoints(120)
      .build();
      const reParty = new PartyBuilder(re).withPoints(120).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.totalPoints()).toBe(5);
      expect([...score.listExtras(re)]).toEqual([
        extras.win,
        extras.announced_kontra,
        extras.opposing_party_announced_no_90,
        extras.got_120_against_no_90,
      ]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test("should get 1 point when getting 90 points against a 'no 60' announcement", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withPoints(150)
      .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(90).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toBe(7);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re,
        extras.announced_re,
        extras.opposing_party_announced_no_90,
        extras.opposing_party_announced_no_60,
        extras.got_90_against_no_60,
      ]);
      expect([...score.listExtras(re)]).toEqual([]);
    });

    test("should get 1 point when getting 60 points against a 'no 30' announcement", () => {
      const kontraParty = new PartyBuilder(kontra)
      .withAnnouncement(announcements.kontra)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withAnnouncement(announcements.no_30)
      .withPoints(180)
      .build();
      const reParty = new PartyBuilder(re).withPoints(60).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.totalPoints()).toBe(7);
      expect([...score.listExtras(re)]).toEqual([
        extras.win,
        extras.announced_kontra,
        extras.opposing_party_announced_no_90,
        extras.opposing_party_announced_no_60,
        extras.opposing_party_announced_no_30,
        extras.got_60_against_no_30,
      ]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test("should get 1 point when getting 30 points against a 'no points' announcement", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withAnnouncement(announcements.no_30)
      .withAnnouncement(announcements.no_points)
      .withPoints(210)
      .build();
      const kontraParty = new PartyBuilder(kontra).withPoints(30).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toBe(9);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re,
        extras.announced_re,
        extras.opposing_party_announced_no_90,
        extras.opposing_party_announced_no_60,
        extras.opposing_party_announced_no_30,
        extras.opposing_party_announced_no_points,
        extras.got_30_against_no_points,
      ]);
      expect([...score.listExtras(re)]).toEqual([]);
    });

    test("should get 1 point each for own and for losing party's announcements", () => {
      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withPoints(59)
      .build();

      const kontraParty = new PartyBuilder(kontra)
      .withAnnouncement(announcements.kontra)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withPoints(181)
      .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.totalPoints()).toBe(14);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re,
        extras.announced_re,
        extras.announced_kontra,
        extras.no_90,
        extras.announced_no_90,
        extras.opposing_party_announced_no_90,
        extras.got_120_against_no_90,
        extras.no_60,
        extras.announced_no_60,
        extras.opposing_party_announced_no_60,
        extras.got_90_against_no_60,
      ]);
      expect([...score.listExtras(re)]).toEqual([]);
    });

    test("should lose both when neither reached their announced points", () => {
      /* how does this happen?
      * imagine "re" announces "no 90", and "kontra" announces "no 60"
      * now the game ends 110/130 - neither reached their announced goal
      * as a consequence there's no "winning" point, only trick-based extras
      */

      const reParty = new PartyBuilder(re)
      .withAnnouncement(announcements.re)
      .withAnnouncement(announcements.no_90)
      .withPoints(110)
      .build();

      const kontraParty = new PartyBuilder(kontra)
      .withAnnouncement(announcements.kontra)
      .withAnnouncement(announcements.no_90)
      .withAnnouncement(announcements.no_60)
      .withPoints(130)
      .build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(null);
      expect(score.totalPoints()).toBe(0);
      expect([...score.listExtras(kontra)]).toEqual([]);
      expect([...score.listExtras(re)]).toEqual([]);
    });

    test.todo("should get 1 point for winning a 'Doppelkopf'");
    test.todo("should get 1 point for catching a 'Fox'");
    test.todo("should get 1 point for winning the last trick with 'Charly'");
  });
});
