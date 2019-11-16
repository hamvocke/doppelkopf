import { Features, Feature, FeatureManager } from "@/models/features";

test("create new feature", () => {
  const someFeature = new Feature("my feature", false);
  expect(someFeature.name).toEqual("my feature");
  expect(someFeature.enabled).toBe(false);
});

test("should have dict of features", () => {
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

test("should have default API Url", () => {
  expect(Features.api_url).toEqual("https://doppelkopf.ham.codes/api/features");
});

test("should use override API Url", () => {
  let Features = new FeatureManager("https://example.org/some/path");
  expect(Features.api_url).toEqual("https://example.org/some/path");
});
