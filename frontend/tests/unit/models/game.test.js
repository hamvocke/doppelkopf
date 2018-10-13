import { Game } from "@/models/game";

let game;

beforeEach(() => {
  game = new Game();
  game.startGame();
});

test("game has 4 players", () => {
  game.startGame();

  expect(game.players[0].name).toBe("Player 1");
  expect(game.players[1].name).toBe("Player 2");
  expect(game.players[2].name).toBe("Player 3");
  expect(game.players[3].name).toBe("Player 4");
});

test("game has 1 human player", () => {
  game.startGame();

  expect(game.players[0].isHuman).toBe(true);
  expect(game.players[1].isHuman).toBe(false);
  expect(game.players[2].isHuman).toBe(false);
  expect(game.players[3].isHuman).toBe(false);
});

test("game has a deck", () => {
  game.startGame();

  expect(game.deck).toBeDefined();
});

test("game has a current round", () => {
  game.startGame();

  expect(game.currentRound).toBeDefined();
});

test("game deals cards to each player", () => {
  game.startGame();

  expect(game.players[0].hand.cards).toHaveLength(10);
  expect(game.players[1].hand.cards).toHaveLength(10);
  expect(game.players[2].hand.cards).toHaveLength(10);
  expect(game.players[3].hand.cards).toHaveLength(10);
});

test("game starts with an empty scorecard", () => {
  game.startGame();

  expect(game.scorecard).toBeDefined();
});

test("should mark unstarted game as not started", () => {
  expect(new Game().isStarted()).toBe(false);
});

test("should mark new game as started", () => {
  game.startGame();

  expect(game.isStarted()).toBe(true);
});
