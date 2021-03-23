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

describe("Waiting Room", () => {
  test.todo("should join a waiting room");
  test.todo("should become owner when joining as first player");

  test.todo("should connect when joining waiting room");

  test.todo("should be in 'waiting' state on start");

  test.todo("should put new players in queue");

  test.todo("should not allow starting the game until 4 players are there");

  test.todo("should change state to 'ready' once four players are there");

  test.todo("should not accept more than four players");

  test.todo("should allow starting the game when game is ready");

  test.todo("should allow leaving room");

  test.todo("should error if unknown player tries leaving");

  test.todo("should change state to 'waiting' if a player leaves");
});
