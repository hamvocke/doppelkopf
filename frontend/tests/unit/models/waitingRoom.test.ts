import { WaitingRoom, RoomState } from "@/models/waitingRoom";
import { Player } from "@/models/player";
import { Config } from "@/models/config";
import { WebsocketClient } from "@/helpers/websocketClient";
import { mocked } from "ts-jest/utils";

jest.mock("@/helpers/websocketClient");

const fetchMock = require("fetch-mock-jest");
const websocketMock = mocked(WebsocketClient);
const player = new Player("some-player");

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
  test("should join a waiting room", () => {
    const room = new WaitingRoom("some-id", []);
    const anotherPlayer = new Player("another-player");

    room.join(player);
    room.join(anotherPlayer);

    expect(room.players).toEqual([player, anotherPlayer]);
  });

  test("should become owner when joining as first player", () => {
    const room = new WaitingRoom("some-id", []);

    room.join(player);

    expect(room.owner).toEqual(player);
  });

  test("should mark first remote player as owner", () => {
    const room = new WaitingRoom("some-id", [player]);

    expect(room.owner).toEqual(player);
  });

  test("should connect when joining waiting room", () => {
    const room = new WaitingRoom("some-id", []);

    room.join(player);

    expect(websocketMock.mock.instances[0].connect).toHaveBeenCalled();
  });

  test("should be in 'waiting' state on start", () => {
    const room = new WaitingRoom("some-id", []);

    room.join(player);

    expect(room.state).toEqual(RoomState.waiting);
  });

  test("should change state to 'ready' once four players are there", () => {
    const room = new WaitingRoom("some-id", []);

    room.join(player);
    room.join(new Player("player2"));
    room.join(new Player("player3"));
    room.join(new Player("player4"));

    expect(room.state).toEqual(RoomState.ready);
  });

  test("should change state to 'waiting' if a player leaves", () => {
    const room = new WaitingRoom("some-id", []);
    const leavingPlayer = new Player("player4");

    room.join(player);
    room.join(new Player("player2"));
    room.join(new Player("player3"));
    room.join(leavingPlayer);

    room.leave(leavingPlayer);

    expect(room.state).toEqual(RoomState.waiting);
  });

  test.todo("should put new players in queue");

  test.todo("should not allow starting the game until 4 players are there");

  test.todo("should not accept more than four players");

  test.todo("should allow starting the game when game is ready");

  test.todo("should allow leaving room");

  test.todo("should error if unknown player tries leaving");

  test.todo("should change state to 'waiting' if a player leaves");
});
