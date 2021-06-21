import {
  CreateResponse,
  MultiplayerHandler
} from "@/helpers/multiplayerHandler";
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
  let multiplayer = new MultiplayerHandler();

  describe("register", () => {
    test("should register new game", async () => {
      fetchMock.post("http://localhost:5000/api/game", emptyCreateResponse);

      const response = await multiplayer.register();

      expect(response.game.id).toEqual(2);
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

  describe("sockets", () => {
    test("should connect websockets and register handlers", () => {
      multiplayer = new MultiplayerHandler();

      expect(websocketMock.mock.instances[0].connect).toHaveBeenCalled();
      expect(websocketMock.mock.instances[0].on).toHaveBeenCalledTimes(2);
    });

    test("should notify all 'joined' handlers on event", () => {
      let joinedCallback = jest.fn();
      let errorCallback = jest.fn();
      multiplayer.on(Event.joined, joinedCallback);

      multiplayer.handleJoined(JSON.stringify(createResponseWithPlayers));

      expect(joinedCallback).toHaveBeenCalled();
      expect(errorCallback).not.toHaveBeenCalled();
      let receivedPlayers = joinedCallback.mock.calls[0][0];
      expect(receivedPlayers[0].remoteId).toBe(1);
      expect(receivedPlayers[0].name).toBe("some player");
      expect(receivedPlayers[0].isHuman).toBe(true);
      expect(receivedPlayers[0].isMe).toBe(false);
    });

    test("should notify all 'error' handlers on error event", () => {
      let joinedCallback = jest.fn();
      let errorCallback = jest.fn();
      multiplayer.on(Event.error, errorCallback);

      multiplayer.handleError("some error");

      expect(errorCallback).toHaveBeenCalledWith("some error");
      expect(joinedCallback).not.toHaveBeenCalled();
    });
  });
});

const emptyCreateResponse: CreateResponse = {
  game: {
    id: 2,
    players: []
  }
};

const createResponseWithPlayers: CreateResponse = {
  game: {
    id: 2,
    players: [{ id: 1, name: "some player" }]
  }
};
