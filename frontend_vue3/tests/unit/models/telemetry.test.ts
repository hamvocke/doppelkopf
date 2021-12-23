import { Telemetry } from "@/models/telemetry";
import { Config } from "@/models/config";
import fetchMock from "fetch-mock-jest";

// disable testing mode  so we're hitting fetchMock requests
Config.testing = false;

beforeEach(() => {
  fetchMock.reset();
});

test("should send new game event", async () => {
  fetchMock.post(
    "http://localhost:5000/api/metrics/game/singleplayer/start",
    200
  );
  await Telemetry.newGame();
  expect(fetchMock.called()).toBe(true);
});

test("should send win event", async () => {
  fetchMock.post(
    "http://localhost:5000/api/metrics/game/singleplayer/win",
    200
  );
  await Telemetry.win();
  expect(fetchMock.called()).toBe(true);
});

test("should send lose event", async () => {
  fetchMock.post(
    "http://localhost:5000/api/metrics/game/singleplayer/lose",
    200
  );
  await Telemetry.lose();
  expect(fetchMock.called()).toBe(true);
});
