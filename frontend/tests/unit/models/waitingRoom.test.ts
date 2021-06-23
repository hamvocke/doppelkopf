import { Player } from "@/models/player";
import { WaitingRoom } from "@/models/waitingRoom";

let waitingRoom: WaitingRoom;

beforeEach(() => {
  waitingRoom = new WaitingRoom(42);
});

test("should generate game URL", () => {
  expect(waitingRoom.gameUrl).toEqual("http://localhost:8080/#/wait/42");
});
