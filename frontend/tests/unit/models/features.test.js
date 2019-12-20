import { Features, Feature } from "@/models/features";
import { Config } from "@/models/config";
import fetchMock from "fetch-mock";

// disable testing mode so we're hitting fetchMock
Config.testing = false;

beforeEach(() => {
  fetchMock.reset();
});

test("create new feature", () => {
  const someFeature = new Feature("my feature", false);
  expect(someFeature.name).toEqual("my feature");
  expect(someFeature.enabled).toBe(false);
});

test("should have dict of features", () => {
  Features.features = { a: new Feature("a", false) }

  const f = Features.find("a");

  expect(f).toBeDefined();
  expect(f.name).toEqual("a");
  expect(f.enabled).toBe(false);
});

test("should throw error when accessing undefined feature", () => {
  const invalid_lookup = () => Features.find("unknown");

  expect(invalid_lookup).toThrowError(
    'Cannot find feature with name "unknown"'
  );
});

test("should fetch features from backend", async () => {
  const stubbedFeatures = {
    some: new Feature("some", false)
  };
  fetchMock.mock("http://localhost:5000/api/features", stubbedFeatures);

  await Features.getFromServer();

  expect(Features.find("some")).toBeDefined();
});

test("should use default features if fetching fails", async () => {
  fetchMock.mock("http://localhost:5000/api/features", 500);

  await Features.getFromServer();

  expect(Features.find("show_tutorial_link")).toBeDefined();
});
