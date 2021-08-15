import { Announcement } from "@/models/announcements";
import { queen, Suit } from "@/models/card";
import { Game } from "@/models/game";
import { Hand } from "@/models/hand";
import { PartyName } from "@/models/party";
import { Player } from "@/models/player";
import { PartyBuilder } from "../../builders/partyBuilder";

describe("Affinities", () => {
  describe("Normal game - 1,2 vs. 3,4", () => {
    const reParty = new PartyBuilder(PartyName.Re).build();
    const kontraParty = new PartyBuilder(PartyName.Kontra).build();
    const player1 = reParty.players[0];
    const player2 = reParty.players[1];
    const player3 = kontraParty.players[0];
    const player4 = kontraParty.players[1];
    const players = [player1, player2, player3, player4];
    let game = new Game(players);

    beforeEach(() => {
      game = new Game(players);
      player1.reset();
      player2.reset();
      player3.reset();
      player4.reset();
      player1.affinities.setPlayers(players);
      player2.affinities.setPlayers(players);
      player3.affinities.setPlayers(players);
      player4.affinities.setPlayers(players);
      player2.possibleAnnouncements = () => new Set([Announcement.Re]);
      player3.possibleAnnouncements = () => new Set([Announcement.Kontra]);

      expect(player1.isRe()).toEqual(true);
      expect(player2.isRe()).toEqual(true);
      expect(player3.isKontra()).toEqual(true);
      expect(player4.isKontra()).toEqual(true);
    });

    test("Re announces", () => {
      player2.announce(Announcement.Re);
      expect(player1.affinities.for(player2)).toEqual(1);
      expect(player1.affinities.for(player3)).toEqual(-1);
      expect(player1.affinities.for(player4)).toEqual(-1);
      expect(player3.affinities.for(player1)).toEqual(0);
      expect(player3.affinities.for(player2)).toEqual(-1);
      expect(player3.affinities.for(player4)).toEqual(0);
      expect(player4.affinities.for(player1)).toEqual(0);
      expect(player4.affinities.for(player2)).toEqual(-1);
      expect(player4.affinities.for(player3)).toEqual(0);
    });

    test("Kontra announces", () => {
      player3.announce(Announcement.Kontra);
      expect(player1.affinities.for(player2)).toEqual(0);
      expect(player1.affinities.for(player3)).toEqual(-1);
      expect(player1.affinities.for(player4)).toEqual(0);
      expect(player2.affinities.for(player1)).toEqual(0);
      expect(player2.affinities.for(player3)).toEqual(-1);
      expect(player2.affinities.for(player4)).toEqual(0);
      expect(player4.affinities.for(player1)).toEqual(-1);
      expect(player4.affinities.for(player2)).toEqual(-1);
      expect(player4.affinities.for(player3)).toEqual(1);
    });

    test("Queen of clubs played", () => {
      game.currentRound.playerOrder.prioritize(player2);
      player2.hand = new Hand([queen.of(Suit.Clubs).first()]);
      player2.play(player2.hand.highest());
      expect(player1.affinities.for(player2)).toEqual(1);
      expect(player1.affinities.for(player3)).toEqual(-1);
      expect(player1.affinities.for(player4)).toEqual(-1);
      expect(player3.affinities.for(player1)).toEqual(0);
      expect(player3.affinities.for(player2)).toEqual(-1);
      expect(player3.affinities.for(player4)).toEqual(0);
      expect(player4.affinities.for(player1)).toEqual(0);
      expect(player4.affinities.for(player2)).toEqual(-1);
      expect(player4.affinities.for(player3)).toEqual(0);
    });
  });

  describe("Silent Wedding - 1 vs. 2,3,4", () => {
    const reParty = new PartyBuilder(PartyName.Re)
      .withPlayer(new Player("One"))
      .build();
    const kontraParty = new PartyBuilder(PartyName.Kontra)
      .withPlayer(new Player("Two"))
      .withPlayer(new Player("Three"))
      .withPlayer(new Player("Four"))
      .build();
    const player1 = reParty.players[0];
    const player2 = kontraParty.players[0];
    const player3 = kontraParty.players[1];
    const player4 = kontraParty.players[2];
    const players = [player1, player2, player3, player4];
    let game = new Game(players);

    beforeEach(() => {
      game = new Game(players);
      player1.reset();
      player2.reset();
      player3.reset();
      player4.reset();
      player1.affinities.setPlayers(players);
      player2.affinities.setPlayers(players);
      player3.affinities.setPlayers(players);
      player4.affinities.setPlayers(players);
      player2.possibleAnnouncements = () => new Set([Announcement.Re]);
      player3.possibleAnnouncements = () => new Set([Announcement.Kontra]);

      expect(player1.isRe()).toEqual(true);
      expect(player2.isKontra()).toEqual(true);
      expect(player3.isKontra()).toEqual(true);
      expect(player4.isKontra()).toEqual(true);
    });

    test("Queen of clubs played once - nobody knows about the silent wedding", () => {
      player1.hand = new Hand([queen.of(Suit.Clubs).second()]);
      player1.play(player1.hand.highest());
      expect(player2.affinities.for(player1)).toEqual(-1);
      expect(player2.affinities.for(player3)).toEqual(0);
      expect(player2.affinities.for(player4)).toEqual(0);
      expect(player3.affinities.for(player1)).toEqual(-1);
      expect(player3.affinities.for(player2)).toEqual(0);
      expect(player3.affinities.for(player4)).toEqual(0);
      expect(player4.affinities.for(player1)).toEqual(-1);
      expect(player4.affinities.for(player3)).toEqual(0);
      expect(player4.affinities.for(player2)).toEqual(0);
    });

    test("Queen of clubs played twice - everybody knows now", () => {
      player2.affinities.hasPlayedQueenOfClubs = () => true;
      player3.affinities.hasPlayedQueenOfClubs = () => true;
      player4.affinities.hasPlayedQueenOfClubs = () => true;
      player1.hand = new Hand([queen.of(Suit.Clubs).second()]);
      player1.play(player1.hand.highest());
      expect(player2.affinities.for(player1)).toEqual(-1);
      expect(player2.affinities.for(player3)).toEqual(1);
      expect(player2.affinities.for(player4)).toEqual(1);
      expect(player3.affinities.for(player1)).toEqual(-1);
      expect(player3.affinities.for(player2)).toEqual(1);
      expect(player3.affinities.for(player4)).toEqual(1);
      expect(player4.affinities.for(player1)).toEqual(-1);
      expect(player4.affinities.for(player3)).toEqual(1);
      expect(player4.affinities.for(player2)).toEqual(1);
    });
  });
});
