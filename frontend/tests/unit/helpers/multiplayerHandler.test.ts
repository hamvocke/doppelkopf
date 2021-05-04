import { MultiplayerHandler } from "@/helpers/multiplayerHandler";
import { WebsocketClient, Event } from "@/helpers/websocketClient";
import { Config } from "@/models/config";
import { mocked } from "ts-jest/utils";

jest.mock("@/helpers/websocketClient");

import fetchMock from "fetch-mock-jest";
import { Player } from "@/models/player";
const websocketMock = mocked(WebsocketClient);

beforeEach(() => {
  fetchMock.reset();
  // disable testing mode so we're hitting fetchMock requests
  Config.testing = false;
  websocketMock.mockClear();
});

afterAll(() => {
  Config.testing = true;
});

describe("Multiplayer Handler", () => {
  const multiplayer = new MultiplayerHandler();

  describe("register", () => {
    test("should register new game", async () => {
      fetchMock.post("http://localhost:5000/api/game", stubbedCreateResponse);

      const response = await multiplayer.register();

      expect(response.game.id).toEqual("2");
      expect(response.game.players).toEqual([]);
    });

    test("should throw exception on connection error", async () => {
      fetchMock.post("http://localhost:5000/api/game", { throws: "failed" });

      async function failingRequest() {
        await multiplayer.register();
      }

      await expect(failingRequest()).rejects.toThrowError(
        "Failed to create multiplayer game: failed"
      );
    });

    test("should throw exception on non-ok response", async () => {
      fetchMock.post("http://localhost:5000/api/game", 503);

      async function failingRequest() {
        await multiplayer.register();
      }

      await expect(failingRequest()).rejects.toThrowError(
        "HTTP request failed with status 503"
      );
    });
  });

  describe("fetch room", () => {
    test("should fetch room info", async () => {
      fetchMock.get(
        "http://localhost:5000/api/game/some-game",
        stubbedFetchResponse
      );

      const room = await multiplayer.fetchRoom("some-game");

      expect(room.gameId).toEqual("some-game");
      expect(room.players.map(p => p.name)).toEqual(["Lenny", "Carl"]);
    });

    test.todo("should handle unknown room id");

    test("should throw exception on connection error", async () => {
      fetchMock.get("http://localhost:5000/api/game/some-game", {
        throws: "failed"
      });

      async function failingFetch() {
        await multiplayer.fetchRoom("some-game");
      }

      await expect(failingFetch()).rejects.toThrowError(
        "Failed to fetch room state: failed"
      );
    });

    test("should throw exception on non-ok response", async () => {
      fetchMock.get("http://localhost:5000/api/game/some-game", 503);

      async function failingFetch() {
        await multiplayer.fetchRoom("some-game");
      }

      await expect(failingFetch()).rejects.toThrowError(
        "Failed to fetch room state: Error: HTTP request failed with status 503"
      );
    });

    test("should connect websocket and register listeners", async () => {
      fetchMock.get(
        "http://localhost:5000/api/game/some-game",
        stubbedFetchResponse
      );
      const multiplayer = new MultiplayerHandler();

      await multiplayer.fetchRoom("some-game");

      expect(websocketMock.mock.instances[0].connect).toHaveBeenCalled();
      expect(websocketMock.mock.instances[0].on).toHaveBeenCalledWith(
        Event.joined,
        multiplayer.onJoined
      );
    });
  });

  describe("join", () => {
    beforeEach(() => {
      fetchMock.get(
        "http://localhost:5000/api/game/some-game",
        stubbedFetchResponse
      );
    });

    test("should send join event via socket", async () => {
      const multiplayer = new MultiplayerHandler();
      await multiplayer.fetchRoom("some-game"); // attaches waiting room to multiplayer instance behind the scenes
      const player = new Player("some-player");

      multiplayer.joinRoom(player);

      const expectedPayload = {
        game: {
          id: "some-game"
        },
        player: {
          id: player.id,
          name: player.name
        }
      };
      expect(websocketMock.mock.instances[0].emit).toHaveBeenCalledWith(
        Event.join,
        expectedPayload
      );
    });
  });
});

const stubbedCreateResponse = {
  game: {
    id: "2",
    players: []
  }
};

const stubbedFetchResponse = {
  game: {
    id: "some-game",
    players: [{ name: "Lenny" }, { name: "Carl" }]
  }
};
