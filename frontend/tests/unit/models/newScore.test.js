
import { NewScore } from "@/models/newScore";
import { kontra, re } from "../../../src/models/party";
import { extras } from "@/models/extras";
import { PartyBuilder } from "../../builders/partyBuilder";

describe("Score evaluation", () => {
  describe("re party", () => {

    test("should win with more than 120 points", () => {
      const reParty = new PartyBuilder(re).withPoints(121).build();
      const kontraParty = new PartyBuilder(re).withPoints(119).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(re);
      expect(score.losingPartyName()).toBe(kontra);
      expect(score.points()).toBe(1);
      expect([...score.listExtras(re)]).toEqual([extras.win]);
      expect([...score.listExtras(kontra)]).toEqual([]);
    });

    test.todo("should lose with 120 points if no announcement was made");
    test.todo("should win with 120 points if kontra party announced winning");
    test.todo("should lose with 120 points if both parties announced winning");

    test.todo("should get 2 points for announcing 're'");
  });

  describe("kontra party", () => {
    test("should win with 120 points or more", () => {
      const reParty = new PartyBuilder(re).withPoints(120).build();
      const kontraParty = new PartyBuilder(re).withPoints(120).build();

      const score = new NewScore(reParty, kontraParty);

      expect(score.winningPartyName()).toBe(kontra);
      expect(score.losingPartyName()).toBe(re);
      expect(score.points()).toBe(2);
      expect([...score.listExtras(re)]).toEqual([]);
      expect([...score.listExtras(kontra)]).toEqual([
        extras.win,
        extras.beat_re
      ]);
    });
    test.todo("should lose with 120 points and announcing 'kontra'");
    test.todo("should win with 121 points or more and announcing 'kontra'");

    test.todo("should get 1 point for winning against 're'");

    test.todo("should get 2 points for announcing 'kontra'");
  });

  describe("both parties", () => {
    test.todo("should get 1 point for winning");
    test.todo("should get 1 point for getting more than 150 points");
    test.todo("should get 1 point for getting more than 180 points");
    test.todo("should get 1 point for getting more than 210 points");
    test.todo("should get 1 point for getting 240 points");

    test.todo("should get 1 point for announcing 'no 90' and getting more than 150 points");
    test.todo("should get 1 point for announcing 'no 60' and getting more than 180 points");
    test.todo("should get 1 point for announcing 'no 30' and getting more than 210 points");
    test.todo("should get 1 point for announcing 'no points' and getting 240 points");

    test.todo("should lose with less than 151 points when announcing 'no 90'");
    test.todo("should lose with less than 181 points when announcing 'no 60'");
    test.todo("should lose with less than 211 points when announcing 'no 30'");
    test.todo("should lose with less than 240 points when announcing 'no points'");

    test.todo("should get 1 point when getting 120 points against a 'no 90' announcement");
    test.todo("should get 1 point when getting 90 points against a 'no 60' announcement");
    test.todo("should get 1 point when getting 60 points against a 'no 30' announcement");
    test.todo("should get 1 point when getting 30 points against a 'no points' announcement");

    // how can this happen?
    // imaging "re" announces "no 90", and "kontra" announces "no 60"
    // now the game ends 110/130 - neither reached their announced goal
    // as a consequence there's no "winning" point, only trick-based extras
    test.todo("should lose both when neither reached their announced points");

    test.todo("should get 1 point for winning a 'Doppelkopf'");
    test.todo("should get 1 point for catching a 'Fox'");
    test.todo("should get 1 point for winning the last trick with 'Charly'");
  });
});
