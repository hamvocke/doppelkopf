import { Game } from "@/models/game";
import { TrickStack } from "@/models/trickStack";
import { Trick } from "@/models/trick";

let game;

beforeEach(() => {
  game = new Game();
});

test("game has 4 players", () => {
  expect(game.players[0].name).toBeDefined();
  expect(game.players[1].name).toBeDefined();
  expect(game.players[2].name).toBeDefined();
  expect(game.players[3].name).toBeDefined();
});

test("game has 1 human player", () => {
  expect(game.players[0].isHuman).toBe(true);
  expect(game.players[1].isHuman).toBe(false);
  expect(game.players[2].isHuman).toBe(false);
  expect(game.players[3].isHuman).toBe(false);
});

test("game has a deck", () => {
  expect(game.deck).toBeDefined();
});

test("game has a current round", () => {
  expect(game.currentRound).toBeDefined();
});

test("new game is not started", () => {
  expect(game.isStarted()).toBe(false);
});

test("should start a game", () => {
  game.start();
  expect(game.isStarted()).toBe(true);
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

test("should start a new round", () => {
  const previousRound = game.currentRound;
  game.players[0].hand.cards = [];

  game.nextRound();

  expect(game.currentRound).not.toBe(previousRound);
  expect(game.players[0].hand.cards).toHaveLength(10);
});

test("should clear trick stacks", () => {
  const someTrickStack = new TrickStack([new Trick(4), new Trick(4)]);
  game.players.forEach(player => (player.trickStack = someTrickStack));

  game.clearTrickStacks();

  const freshTrickStack = new TrickStack();
  expect(game.players[0].trickStack).toEqual(freshTrickStack);
  expect(game.players[1].trickStack).toEqual(freshTrickStack);
  expect(game.players[2].trickStack).toEqual(freshTrickStack);
  expect(game.players[3].trickStack).toEqual(freshTrickStack);
});

test("should let human player open the game", () => {
  expect(game.playerOpening).toBe(game.players[0]);
  expect(game.currentRound.waitingForPlayer()).toBe(game.players[0]);
});

test("should keep track of opening order", () => {
  game.nextRound();
  expect(game.playerOpening).toBe(game.players[1]);

  game.nextRound();
  expect(game.playerOpening).toBe(game.players[2]);

  game.nextRound();
  expect(game.playerOpening).toBe(game.players[3]);

  game.nextRound();
  expect(game.playerOpening).toBe(game.players[0]);
});
