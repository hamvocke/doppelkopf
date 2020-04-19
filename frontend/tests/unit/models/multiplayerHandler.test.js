import { MultiplayerHandler } from "@/models/multiplayerHandler";
import { Config } from "@/models/config";
const fetchMock = require("fetch-mock-jest");

// disable testing mode  so we're hitting fetchMock requests
Config.testing = false;

beforeEach(() => {
  fetchMock.reset();
});

describe("Multiplayer Handler", () => {
  const stubbedResponse = {
    gameId: "smell-brown-slide",
    players: [
      {
        name: "Karl Heinz"
      },
      {
        name: "Brigitte"
      },
      {
        name: "Svenja"
      }
    ]
  };

  test("should fetch game state", async () => {
    fetchMock.get(
      "http://localhost:5000/api/game/smell-brown-slide",
      stubbedResponse
    );
    await MultiplayerHandler.joinWaitingRoom("smell-brown-slide");
    expect(fetchMock.called()).toBe(true);
  });

  test("should create copy of waiting room", async () => {
    fetchMock.get(
      "http://localhost:5000/api/game/smell-brown-slide",
      stubbedResponse
    );

    let room = await MultiplayerHandler.joinWaitingRoom("smell-brown-slide");

    expect(room.gameId).toEqual("smell-brown-slide");
    expect(room.players).toHaveLength(4);
    expect(room.players.some(p => p.name === "Karl Heinz")).toBe(true);
    expect(room.players.some(p => p.name === "Brigitte")).toBe(true);
    expect(room.players.some(p => p.name === "Svenja")).toBe(true);
  });

  test.todo("should join with saved name");
  test.todo("should retry if fetching state fails");
});
