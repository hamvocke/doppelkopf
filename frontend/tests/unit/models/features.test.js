import { Features, Feature } from "@/models/features";

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

  expect(invalid_lookup).toThrowError('Cannot find feature with name "unknown"');
});
