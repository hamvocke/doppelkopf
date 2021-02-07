import { announcements } from "@/models/announcements";
import { queen, suits } from "@/models/card";
import { Game } from "@/models/game";
import { Hand } from "@/models/hand";
import { kontra, re } from "@/models/party";
import { Trick } from "@/models/trick";
import { PartyBuilder } from "../../builders/partyBuilder";

describe("Affinities", () => {
  const reParty = new PartyBuilder(re).build();
  const kontraParty = new PartyBuilder(kontra).build();
  const player1 = reParty.players[0];
  const player2 = reParty.players[1];
  const player3 = kontraParty.players[0];
  const player4 = kontraParty.players[1];
  const players = [player1, player2, player3, player4];
  const game = new Game(players);

  beforeEach(() => {
    player1.reset();
    player2.reset();
    player3.reset();
    player4.reset();
    player1.affinities.setPlayers(players);
    player2.affinities.setPlayers(players);
    player3.affinities.setPlayers(players);
    player4.affinities.setPlayers(players);
    player2.possibleAnnouncements = () => [announcements.re];
    player3.possibleAnnouncements = () => [announcements.kontra];

    expect(player1.isRe()).toEqual(true);
    expect(player2.isRe()).toEqual(true);
    expect(player3.isKontra()).toEqual(true);
    expect(player4.isKontra()).toEqual(true);
  });

  describe("Affinities through announcement", () => {
    test("Change affinity", () => {
      player1.affinities.setPlayerAffinityByParty(player2);
      expect(player1.affinities.getPlayerAffinityValue(player2)).toEqual(1);
    });

    test("Re announces", () => {
      player2.announce(announcements.re);
      expect(player1.affinities.getPlayerAffinityValue(player2)).toEqual(1);
      expect(player1.affinities.getPlayerAffinityValue(player3)).toEqual(-1);
      expect(player1.affinities.getPlayerAffinityValue(player4)).toEqual(-1);
      expect(player3.affinities.getPlayerAffinityValue(player1)).toEqual(0);
      expect(player3.affinities.getPlayerAffinityValue(player2)).toEqual(-1);
      expect(player3.affinities.getPlayerAffinityValue(player4)).toEqual(0);
      expect(player4.affinities.getPlayerAffinityValue(player1)).toEqual(0);
      expect(player4.affinities.getPlayerAffinityValue(player2)).toEqual(-1);
      expect(player4.affinities.getPlayerAffinityValue(player3)).toEqual(0);
    });

    test("Kontra announces", () => {
      player3.announce(announcements.kontra);
      expect(player1.affinities.getPlayerAffinityValue(player2)).toEqual(0);
      expect(player1.affinities.getPlayerAffinityValue(player3)).toEqual(-1);
      expect(player1.affinities.getPlayerAffinityValue(player4)).toEqual(0);
      expect(player2.affinities.getPlayerAffinityValue(player1)).toEqual(0);
      expect(player2.affinities.getPlayerAffinityValue(player3)).toEqual(-1);
      expect(player2.affinities.getPlayerAffinityValue(player4)).toEqual(0);
      expect(player4.affinities.getPlayerAffinityValue(player1)).toEqual(-1);
      expect(player4.affinities.getPlayerAffinityValue(player2)).toEqual(-1);
      expect(player4.affinities.getPlayerAffinityValue(player3)).toEqual(1);
    });
  });

  describe("Affinities through cards", () => {
    test("Queen of clubs played", () => {
      game.currentRound.playerOrder.prioritize(player2);
      player2.hand = new Hand([queen.of(suits.clubs).first()]);
      player2.play(player2.hand.highest());
      expect(player1.affinities.getPlayerAffinityValue(player2)).toEqual(1);
      expect(player1.affinities.getPlayerAffinityValue(player3)).toEqual(-1);
      expect(player1.affinities.getPlayerAffinityValue(player4)).toEqual(-1);
      expect(player3.affinities.getPlayerAffinityValue(player1)).toEqual(0);
      expect(player3.affinities.getPlayerAffinityValue(player2)).toEqual(-1);
      expect(player3.affinities.getPlayerAffinityValue(player4)).toEqual(0);
      expect(player4.affinities.getPlayerAffinityValue(player1)).toEqual(0);
      expect(player4.affinities.getPlayerAffinityValue(player2)).toEqual(-1);
      expect(player4.affinities.getPlayerAffinityValue(player3)).toEqual(0);
    });
  });
});
