import { WaitingRoom, states } from "@/models/waitingRoom";
import { Player } from "@/models/player";
import { Config } from "@/models/config";
const fetchMock = require("fetch-mock-jest");

beforeEach(() => {
  fetchMock.reset();
  Config.testing = true;
});

const owner = new Player("owner");

describe("Waiting Room", () => {
  test("should create new waiting room", () => {
    const room = new WaitingRoom(owner);
    expect(room.players).toEqual([owner]);
  })

  test("should fetch waiting room from server", async () => {
    // disable testing mode so we're hitting fetchMock requests
    Config.testing = false;

    const stubbedResponse = {
      game: {
        id: "smell-brown-slide",
        players: [
          { name: "Karl Heinz" },
          { name: "Brigitte" },
          { name: "Svenja" }
        ]
      }
    };

    fetchMock.get(
      "http://localhost:5000/api/game/smell-brown-slide/join",
      stubbedResponse
    );

    let room = await WaitingRoom.fetch("smell-brown-slide");

    expect(fetchMock.called()).toBe(true);
    expect(room.gameId).toEqual("smell-brown-slide");
    expect(room.players.some(p => p.name === "Karl Heinz")).toBe(true);
    expect(room.players.some(p => p.name === "Brigitte")).toBe(true);
    expect(room.players.some(p => p.name === "Svenja")).toBe(true);
  });

  test("should be in 'waiting' state on start", () => {
    const room = new WaitingRoom(owner);
    expect(room.state).toBe(states.waiting);
  });

  test("should put new players in queue", () => {
    const room = new WaitingRoom(owner);

    room.join(new Player("player 2"));
    room.join(new Player("player 3"));
    room.join(new Player("player 4"));

    expect(room.players.map(p => p.name)).toEqual([
      "owner",
      "player 2",
      "player 3",
      "player 4"
    ]);
  });

  test("should not allow starting the game until 4 players are there", () => {
    const room = new WaitingRoom(owner);

    const throws = () => room.startGame();

    expect(throws).toThrow("Can't start game until 4 players are there");
  });

  test("should change state to 'ready' once four players are there", () => {
    const room = new WaitingRoom(owner);

    room.join(new Player("player 2"));
    room.join(new Player("player 3"));
    room.join(new Player("player 4"));

    expect(room.state).toBe(states.ready);
  });

  test("should not accept more than four players", () => {
    const room = new WaitingRoom(owner);

    room.join(new Player("player 2"));
    room.join(new Player("player 3"));
    room.join(new Player("player 4"));

    const throws = () => room.join(new Player("player 5"));

    expect(throws).toThrow("Room is full");
  });

  test("should allow starting the game when game is ready", () => {
    const room = new WaitingRoom(owner);
    room.join(new Player("player 2"));
    room.join(new Player("player 3"));
    room.join(new Player("player 4"));

    const game = room.startGame();

    expect(game).toBeDefined();
  });

  test("should allow leaving room", () => {
    const room = new WaitingRoom(owner);
    let p1 = new Player("player 1");
    let p2 = new Player("player 2");
    room.join(p1);
    room.join(p2);
    room.leave(p2);

    expect(room.players).toEqual([owner, p1]);
  });

  test("should error if unknown player tries leaving", () => {
    const room = new WaitingRoom(owner);

    const throws = () => room.leave(new Player("player 2"));

    expect(throws).toThrow("Player 'player 2' is not in this room");
  });

  test("should change state to 'waiting' if a player leaves", () => {
    const room = new WaitingRoom(owner);
    let p2 = new Player("player 2");
    room.join(p2);
    room.join(new Player("player 3"));
    room.join(new Player("player 4"));

    room.leave(p2);

    expect(room.state).toBe(states.waiting);
  });
});
