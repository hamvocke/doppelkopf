import { Game } from "@/models/game";

let game;

beforeEach(() => {
  game = new Game();
});

test("game has 4 players", () => {
  expect(game.players[0].name).toBe("Player 1");
  expect(game.players[1].name).toBe("Player 2");
  expect(game.players[2].name).toBe("Player 3");
  expect(game.players[3].name).toBe("Player 4");
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
