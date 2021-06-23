import { WebsocketClient, Event } from "@/helpers/websocketClient";
import { Player } from "@/models/player";
import { WaitingRoom } from "@/models/waitingRoom";
import { mocked } from "ts-jest/utils";

jest.mock("@/helpers/websocketClient");
let websocketMock = mocked(WebsocketClient);

let waitingRoom: WaitingRoom;

let player1 = new Player("player 1");
let player2 = new Player("player 2");
let player3 = new Player("player 3");
let player4 = new Player("player 4");

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
