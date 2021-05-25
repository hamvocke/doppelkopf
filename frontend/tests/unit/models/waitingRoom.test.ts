import { WaitingRoom, RoomState } from "@/models/waitingRoom";
import { Player } from "@/models/player";
import { mocked } from "ts-jest/utils";
import { MultiplayerHandler } from "@/helpers/multiplayerHandler";

jest.mock("@/helpers/multiplayerHandler");

const multiplayerHandler = mocked(MultiplayerHandler);
const player = new Player("some-player");

beforeEach(() => {
  multiplayerHandler.mockClear();
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

  test("should generate correct game url", () => {
    const room = new WaitingRoom("some-id", []);

    expect(room.gameUrl).toEqual("http://localhost:8000/#/wait/some-id");
  });

  test("should mark first remote player as owner", () => {
    const room = new WaitingRoom("some-id", [player]);

    expect(room.owner).toEqual(player);
  });

  test("should call multiplayer handler joining waiting room", () => {
    const room = new WaitingRoom("some-id", [], new MultiplayerHandler());

    room.join(player);

    expect(multiplayerHandler.mock.instances[0].joinRoom).toHaveBeenCalled();
  });

  test("should ignore joining the same room multiple times", () => {
    const room = new WaitingRoom("some-id", [], new MultiplayerHandler());

    room.join(player);
    room.join(player);
    room.join(player);

    expect(multiplayerHandler.mock.instances[0].joinRoom).toHaveBeenCalledTimes(
      1
    );
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

  test("should put new players in queue", () => {
    const room = new WaitingRoom("some-id", []);
    const anotherPlayer = new Player("player2");

    room.join(player);
    room.join(anotherPlayer);

    expect(room.players).toEqual([player, anotherPlayer]);
  });

  test("should remove player when leaving a room", () => {
    const room = new WaitingRoom("some-id", []);
    const anotherPlayer = new Player("player2");

    room.join(player);
    room.join(anotherPlayer);

    room.leave(anotherPlayer);

    expect(room.players).toEqual([player]);
  });

  test("should not accept more than four players", () => {
    const room = new WaitingRoom("some-id", []);

    room.join(player);
    room.join(new Player("player2"));
    room.join(new Player("player3"));
    room.join(new Player("player4"));

    function throwingJoin() {
      room.join(new Player("player5"));
    }

    expect(throwingJoin).toThrowError("Room is full");
  });

  test("should error if unknown player tries leaving", () => {
    const room = new WaitingRoom("some-id", []);
    const anotherPlayer = new Player("player2");

    room.join(player);
    room.join(anotherPlayer);

    function throwingLeave() {
      room.leave(new Player("unknown"));
    }

    expect(throwingLeave).toThrowError("Player 'unknown' is not in this room");
  });

  test.todo("should not allow starting the game until 4 players are there");

  test.todo("should allow starting the game when game is ready");
});
