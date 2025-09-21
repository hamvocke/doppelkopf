import { beforeEach, describe, expect, test } from "vitest";
import { Game } from "@/models/game";
import { TrickStack } from "@/models/trickStack";
import { Trick } from "@/models/trick";
import { Features } from "@/models/features";
import { RoundState } from "@/models/round";

let game: Game;

beforeEach(() => {
  game = Game.singlePlayer();
});

test("game has 1 human player", () => {
  expect(game.players[0].isHuman).toBe(true);
  expect(game.players[1].isHuman).toBe(false);
  expect(game.players[2].isHuman).toBe(false);
  expect(game.players[3].isHuman).toBe(false);
});

test("game deals cards to each player", () => {
  expect(game.players[0].hand.cards).toHaveLength(10);
  expect(game.players[1].hand.cards).toHaveLength(10);
  expect(game.players[2].hand.cards).toHaveLength(10);
  expect(game.players[3].hand.cards).toHaveLength(10);
});

test("game starts with an empty scorecard", () => {
  expect(game.scorecard).toBeDefined();
});

test("should start a new round if 'reservations' feature is disabled", () => {
  Features.enableReservations = false;
  const previousRound = game.currentRound;
  game.players[0].hand.cards = [];

  game.nextRound();

  expect(game.currentRound).not.toBe(previousRound);
  expect(game.players[0].hand.cards).toHaveLength(10);
  expect(game.currentRound.roundState).toBe(RoundState.Started);
});

test("should wait for reservations round if 'reservations' feature is enabled", () => {
  Features.enableReservations = true;
  const previousRound = game.currentRound;
  game.players[0].hand.cards = [];

  game.nextRound();

  expect(game.currentRound).not.toBe(previousRound);
  expect(game.players[0].hand.cards).toHaveLength(10);
  expect(game.currentRound.roundState).toBe(RoundState.AskingForReservations);
});

test("should reset all players stacks when starting a new round", () => {
  const someTrickStack = new TrickStack([new Trick(game.players), new Trick(game.players)]);
  game.players.forEach((player) => (player.trickStack = someTrickStack));

  game.nextRound();

  expect(game.players[0].trickStack).toEqual(new TrickStack());
  expect(game.players[1].trickStack).toEqual(new TrickStack());
  expect(game.players[2].trickStack).toEqual(new TrickStack());
  expect(game.players[3].trickStack).toEqual(new TrickStack());
});

test("should let human player open the game", () => {
  expect(game.currentRound.waitingForPlayer()).toBe(game.players[0]);
});
