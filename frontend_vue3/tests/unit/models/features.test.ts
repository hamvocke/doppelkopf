import { Features } from "@/models/features";
import { Config } from "@/models/config";

// disable testing mode so we're hitting fetchMock
Config.testing = false;

function mockFetch(data: {}, ok = true, status = 200, ) {
  return jest.fn().mockImplementationOnce(() => Promise.resolve({ ok: ok, status: status, json: () => data }));
}

beforeEach(() => {
  Features.reset();
});

test("should fetch features from backend", async () => {
  const stubbedFeatures = {
    features: {
      "game.announcements.enable": true
    }
  };
  window.fetch = mockFetch(stubbedFeatures);

  await Features.fetch();
  const feature = Features.get().enableAnnouncements;

  expect(feature).toBe(true);
});

test("should use default features if fetching fails", async () => {
  window.fetch = mockFetch({}, true, 500);

  await Features.fetch();
  const feature = Features.get().enableTutorial;

  expect(feature).toBe(true);
});
