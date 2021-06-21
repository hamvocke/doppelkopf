import { WaitingRoom } from "@/models/waitingRoom";

let waitingRoom: WaitingRoom;

beforeEach(() => {
  waitingRoom = new WaitingRoom(42);
});

test("should create waiting room", () => {
  expect(true).toBeTruthy();
});
