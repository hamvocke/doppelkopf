import { Telemetry } from "@/models/telemetry";
import fetchMock from "fetch-mock";

test("should send new game event", async () => {
  fetchMock.post("http://localhost:5000/api/game/new", { id: 1234 });
  let gameId = await Telemetry.newGame();
  expect(gameId).toEqual(1234);
  expect(fetchMock.called()).toBe(true);
});
