import { WebsocketClient, Event } from "@/helpers/websocketClient";
import { WaitingRoom } from "@/models/waitingRoom";
import { PlayerBuilder } from "../../builders/playerBuilder";
import { mocked } from "ts-jest/utils";

jest.mock("@/helpers/websocketClient");
let websocketMock = mocked(WebsocketClient);

let waitingRoom: WaitingRoom;

let player1 = new PlayerBuilder("player 1").withRemoteId(1).build();
let player2 = new PlayerBuilder("player 2").withRemoteId(2).build();
let player3 = new PlayerBuilder("player 3").withRemoteId(3).build();
let player4 = new PlayerBuilder("player 4").withRemoteId(4).build();

beforeEach(() => {
  websocketMock.mockReset();
  waitingRoom = new WaitingRoom(42);
});

test("should generate game URL", () => {
  expect(waitingRoom.gameUrl).toEqual("http://localhost:8080/#/wait/42");
});

test("should send join event", () => {
  waitingRoom.join(player1);

  expect(websocketMock.mock.instances[0].emit).toHaveBeenCalledWith(
    Event.join,
    expect.anything()
  );
});

test("should report ready state", () => {
  expect(waitingRoom.isReady).toBe(false);

  waitingRoom.handleJoined([player1]);
  waitingRoom.handleJoined([player1, player2]);
  waitingRoom.handleJoined([player1, player2, player3]);
  waitingRoom.handleJoined([player1, player2, player3, player4]);

  expect(waitingRoom.isReady).toBe(true);
});
