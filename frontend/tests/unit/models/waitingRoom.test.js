import { WaitingRoom, states } from "@/models/waitingRoom";
import { Player } from "@/models/player";

describe("Waiting Room", () => {
  test("should generate game id on creation", () => {
    const room = new WaitingRoom();
    expect(room.gameId).toBeDefined();
  });

  test("should be in 'waiting' state on start", () => {
    const room = new WaitingRoom();
    expect(room.state).toBe(states.waiting);
  });

  test("should put new player in queue", () => {
    const room = new WaitingRoom();

    room.join("player 1");
    room.join("player 2");
    room.join("player 3");

    expect(room.players.map(p => p.name)).toEqual([
      "player 1",
      "player 2",
      "player 3"
    ]);
  });

  test("should not allow starting the game until 4 players are there", () => {
    const room = new WaitingRoom();

    const throws = () => room.startGame();

    expect(throws).toThrow("Can't start game until 4 players are there");
  });

  test("should change state to 'ready' once four players are there", () => {
    const room = new WaitingRoom();

    room.join("player 1");
    room.join("player 2");
    room.join("player 3");
    room.join("player 4");

    expect(room.state).toBe(states.ready);
  });

  test("should not accept more than four players", () => {
    const room = new WaitingRoom();

    room.join("player 1");
    room.join("player 2");
    room.join("player 3");
    room.join("player 4");

    const throws = () => room.join(new Player("player 5"));

    expect(throws).toThrow("Room is full");
  });

  test("should allow starting the game when game is ready", () => {
    const room = new WaitingRoom();
    room.join("player 1");
    room.join("player 2");
    room.join("player 3");
    room.join("player 4");

    const game = room.startGame();

    expect(game).toBeDefined();
  });

  test("should allow leaving room", () => {
    const room = new WaitingRoom();
    room.join("player 1");
    room.join("player 2");
    room.leave("player 2");

    expect(room.players.map(p => p.name)).toEqual(["player 1"]);
  });

  test("should error if unknown player tries leaving", () => {
    const room = new WaitingRoom();

    const throws = () => room.leave("player 2");

    expect(throws).toThrow("Player 'player 2' is not in this room");
  });

  test("should change state to 'waiting' if a player leaves", () => {
    const room = new WaitingRoom();
    room.join("player 1");
    room.join("player 2");
    room.join("player 3");
    room.join("player 4");

    room.leave("player 2");

    expect(room.state).toBe(states.waiting);
  });
});
