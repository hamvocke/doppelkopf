import { Player } from "@/models/player";
import { Trick } from "@/models/trick";
import { re, kontra, Party } from "@/models/party";
import { extras } from "@/models/extras";
import { announcements } from "@/models/announcements";

const player1 = new Player("Player 1", true);
const player2 = new Player("Player 2");

test("should aggregate points", () => {
  player1.points = () => 10;
  player2.points = () => 20;
  const party = new Party(re, player1, player2);
  expect(party.points()).toEqual(30);
});

test("should aggregate announcements", () => {
  player1.numberOfCardsLeft = () => 10;
  player1.announce(announcements.no_90);
  player1.announce(announcements.kontra);
  const party = new Party(kontra, player1, player2);
  expect(party.announcements()).toEqual([
    announcements.no_90,
    announcements.kontra
  ]);
});

test("should aggregate extras", () => {
  const doppelkopfTrick = new Trick(4);
  doppelkopfTrick.extras = () => [extras.doppelkopf];
  doppelkopfTrick.isFinished = () => true;

  const foxTrick = new Trick(4);
  foxTrick.extras = () => [extras.fox];
  foxTrick.isFinished = () => true;

  player1.win(doppelkopfTrick);
  player2.win(foxTrick);

  const party = new Party(kontra, player1, player2);
  expect(party.extras()).toEqual([extras.doppelkopf, extras.fox]);
});
