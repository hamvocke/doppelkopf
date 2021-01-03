import { Features } from "@/models/features";
import { Config } from "@/models/config";
const fetchMock = require("fetch-mock-jest");

// disable testing mode so we're hitting fetchMock
Config.testing = false;

beforeEach(() => {
  fetchMock.reset();
  Features.features = undefined;
});

test("should find feature", () => {
  Features.features = {
    a: false,
    b: true
  };

  const f = Features.get("a");

  expect(f).toBe(false);
});

test("should throw error when accessing undefined feature", () => {
  Features.features = {
    a: true,
    b: false
  };

  function getUnknown() {
    Features.get("unknown");
  }

  expect(getUnknown).toThrow('Cannot find feature with name "unknown"');
});

test("should fetch features from backend", async () => {
  const stubbedFeatures = {
    features: {
      "some-toggle": true,
      "another-toggle": false
    }
  };
  fetchMock.mock("http://localhost:5000/api/features", stubbedFeatures);

  await Features.fetch();
  const feature = Features.get("some-toggle");

  expect(feature).toBe(true);
});

test("should use default features if fetching fails", async () => {
  fetchMock.mock("http://localhost:5000/api/features", 500);

  await Features.fetch();
  const feature = Features.get("game.tutorial.enable");

  expect(feature).toBe(true);
});
