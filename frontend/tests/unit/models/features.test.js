import { Features, Feature } from "@/models/features";

test("create new feature", () => {
  const someFeature = new Feature("my feature", false);
  expect(someFeature.name).toEqual("my feature");
  expect(someFeature.enabled).toBe(false);
});

test("should have dict of features", () => {
  expect(Features["a"]).toBeDefined();
  expect(Features["a"].name).toEqual("a");
  expect(Features["a"].enabled).toBe(false);
});
