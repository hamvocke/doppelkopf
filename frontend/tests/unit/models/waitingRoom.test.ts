import { WaitingRoom, states } from "@/models/waitingRoom";
import { Player } from "@/models/player";
import { Config } from "@/models/config";
import { WebsocketClient } from "@/helpers/websocketClient";
import { mocked } from "ts-jest/utils";

jest.mock("@/helpers/websocketClient");

const fetchMock = require("fetch-mock-jest");
const websocketMock = mocked(WebsocketClient);

beforeEach(() => {
  fetchMock.reset();
  websocketMock.mockClear();
  // disable testing mode so we're hitting fetchMock requests
  Config.testing = false;
});

afterAll(() => {
  Config.testing = true;
});

const owner = new Player("owner");

describe("Waiting Room", () => {
  test("should register waiting room", async () => {
    const stubbedCreateResponse = {
      game: {
        id: "2",
        players: []
      }
    };
    fetchMock.post("http://localhost:5000/api/game", stubbedCreateResponse);

    let response = await WaitingRoom.register();

    expect(fetchMock.called()).toBe(true);
    expect(response.game.id).toBe(stubbedCreateResponse.game.id);
  });

  test("should fetch waiting room from server", async () => {
    stubWaitingRoom("1");

    let room = await WaitingRoom.fetch("1");

    expect(fetchMock.called()).toBe(true);
    expect(room.gameId).toEqual("1");
    expect(room.players.some(p => p.name === "Karl Heinz")).toBe(true);
    expect(room.players.some(p => p.name === "Brigitte")).toBe(true);
    expect(room.players.some(p => p.name === "Svenja")).toBe(true);
  });

  test.todo("should join a waiting room");
  test.todo("should become owner when joining as first player");

  test("should connect when joining waiting room", async () => {
    stubWaitingRoom("1");

    const room = await WaitingRoom.fetch("1");
    room.join(owner);

    expect(websocketMock.mock.instances[0].connect).toHaveBeenCalled();
  });

  test.todo("should be in 'waiting' state on start");

  test.todo("should put new players in queue");

  test.todo("should not allow starting the game until 4 players are there");

  test.todo("should change state to 'ready' once four players are there");

  test.todo("should not accept more than four players");

  test.todo("should allow starting the game when game is ready");

  test.todo("should allow leaving room");

  test.todo("should error if unknown player tries leaving");

  test.todo("should change state to 'waiting' if a player leaves");

  function stubWaitingRoom(gameId: string) {
    const stubbedResponse = {
      game: {
        id: gameId,
        players: [
          { name: "Karl Heinz" },
          { name: "Brigitte" },
          { name: "Svenja" }
        ]
      }
    };

    fetchMock.get("http://localhost:5000/api/game/" + gameId, stubbedResponse);
  }
});
