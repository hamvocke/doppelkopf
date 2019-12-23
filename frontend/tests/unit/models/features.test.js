import { Features, Feature } from "@/models/features";
import { Config } from "@/models/config";
import fetchMock from "fetch-mock";

// disable testing mode so we're hitting fetchMock
Config.testing = false;

beforeEach(() => {
  fetchMock.reset();
  Features.features = undefined;
});

test("create new feature", () => {
  const someFeature = new Feature("my feature", false);
  expect(someFeature.name).toEqual("my feature");
  expect(someFeature.enabled).toBe(false);
});

test("should have dict of features", async () => {
  Features.features = { a: new Feature("a", false) };

  const f = await Features.get("a");

  expect(f).toBeDefined();
  expect(f.name).toEqual("a");
  expect(f.enabled).toBe(false);
});

test("should throw error when accessing undefined feature", async () => {
  expect.assertions(1);
  await expect(Features.get("unknown")).rejects.toThrow(
    'Cannot find feature with name "unknown"'
  );
});

test("should fetch features from backend", async () => {
  const stubbedFeatures = {
    some: new Feature("some", false)
  };
  fetchMock.mock("http://localhost:5000/api/features", stubbedFeatures);

  const feature = await Features.get("some");

  expect(feature).toBeDefined();
});

test("should use default features if fetching fails", async () => {
  fetchMock.mock("http://localhost:5000/api/features", 500);

  const feature = await Features.get("show_tutorial_link");

  expect(feature).toBeDefined();
});
