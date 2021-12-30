import { Telemetry } from "@/models/telemetry";
import { Config } from "@/models/config";
import { http } from "@/helpers/httpClient";
import { mocked } from 'ts-jest/utils'

jest.mock("@/helpers/httpClient");
const mockedHttp = mocked(http);

beforeEach(() => {
  mockedHttp.get.mockClear();
  mockedHttp.post.mockClear();
})

// disable testing mode  so we're hitting fetchMock requests
Config.testing = false;

test("should send new game event", async () => {
  await Telemetry.newGame();
  expect(mockedHttp.post).toHaveBeenCalledWith("/api/metrics/game/singleplayer/start");
});

test("should send win event", async () => {
  await Telemetry.win();
  expect(mockedHttp.post).toHaveBeenCalledWith("/api/metrics/game/singleplayer/win");

});

test("should send lose event", async () => {
  await Telemetry.lose();
  expect(mockedHttp.post).toHaveBeenCalledWith("/api/metrics/game/singleplayer/lose");
});
