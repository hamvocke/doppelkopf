import { Features } from "@/models/features";
import { Config } from "@/models/config";
import fetchMock from "fetch-mock-jest";

// disable testing mode so we're hitting fetchMock
Config.testing = false;

beforeEach(() => {
  fetchMock.reset();
  Features.reset();
});

test("should fetch features from backend", async () => {
  const stubbedFeatures = {
    features: {
      "game.multiplayer.enable": false,
      "game.announcements.enable": false
    }
  };
  fetchMock.mock("http://localhost:5000/api/features", stubbedFeatures);

  await Features.fetch();
  const feature = Features.get().enableMultiplayer;

  expect(feature).toBe(false);
});

test("should use default features if fetching fails", async () => {
  fetchMock.mock("http://localhost:5000/api/features", 500);

  await Features.fetch();
  const feature = Features.get().enableTutorial;

  expect(feature).toBe(true);
});
