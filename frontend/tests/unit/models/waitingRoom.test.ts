import { WaitingRoom } from "@/models/waitingRoom";

let waitingRoom: WaitingRoom;

beforeEach(() => {
  waitingRoom = new WaitingRoom();
});

test("should create waiting room", () => {
  expect(true).toBeTruthy();
});
