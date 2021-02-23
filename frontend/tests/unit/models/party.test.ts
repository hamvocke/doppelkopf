import { Player } from "@/models/player";
import { Trick } from "@/models/trick";
import { re, kontra, Party } from "@/models/party";
import { extras } from "@/models/extras";
import { Announcement } from "@/models/announcements";

const player1 = new Player("Player 1", true);
const player2 = new Player("Player 2");
const player3 = new Player("Player 3");
const player4 = new Player("Player 4");

test("should aggregate points", () => {
  player1.points = () => 10;
  player2.points = () => 20;
  const party = new Party(re, player1, player2);
  expect(party.points()).toEqual(30);
});

test("should aggregate announcements", () => {
  player1.numberOfCardsLeft = () => 10;
  player1.announce(Announcement.Kontra);
  player1.announce(Announcement.No90);
  const party = new Party(kontra, player1, player2);
  expect(party.announcements()).toEqual([
    Announcement.Kontra,
    Announcement.No90
  ]);
});

test("should aggregate extras", () => {
  const doppelkopfTrick = new Trick([player1, player2, player3, player4]);
  doppelkopfTrick.extras = () => [extras.doppelkopf];
  doppelkopfTrick.isFinished = () => true;

  const foxTrick = new Trick([player1, player2, player3, player4]);
  foxTrick.extras = () => [extras.fox];
  foxTrick.isFinished = () => true;

  player1.win(doppelkopfTrick);
  player2.win(foxTrick);

  const party = new Party(kontra, player1, player2);
  expect(party.extras()).toEqual([extras.doppelkopf, extras.fox]);
});
