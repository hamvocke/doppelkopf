import { Telemetry } from "@/models/telemetry";
import { Config } from "@/models/config";
import fetchMock from "fetch-mock";

// disable testing mode  so we're hitting fetchMock requests
Config.testing = false;

beforeEach(() => {
  fetchMock.reset();
});

test("should send new game event", async () => {
  fetchMock.post("http://localhost:5000/api/game/new", { id: 1234 });
  await Telemetry.newGame();
  expect(fetchMock.called()).toBe(true);
});

test("should store gameId", async () => {
  fetchMock.post("http://localhost:5000/api/game/new", { id: 1234 });
  await Telemetry.newGame();
  expect(Telemetry.gameId).toEqual(1234);
});

test("should set gameId as undefined if sending new game event fails", async () => {
  fetchMock.post("http://localhost:5000/api/game/new", 500);
  await Telemetry.newGame();
  expect(Telemetry.gameId).toBeUndefined();
});

test("should send win event", async () => {
  Telemetry.gameId = 1234;
  fetchMock.post("http://localhost:5000/api/game/1234/win", 200);
  await Telemetry.win();
  expect(fetchMock.called()).toBe(true);
});


test("should send lose event", async () => {
  Telemetry.gameId = 1234;
  fetchMock.post("http://localhost:5000/api/game/1234/lose", 200);
  await Telemetry.lose();
  expect(fetchMock.called()).toBe(true);
});
