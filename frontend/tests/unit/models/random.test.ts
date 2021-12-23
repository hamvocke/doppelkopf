import { generateNames, sample } from "@/models/random";

describe("Random", () => {
  test("should generate multiple random names", () => {
    const names = generateNames(4);
    expect(names).toHaveLength(4);
    expect(names[0]).toMatch(/\w.*/);
    expect(names[1]).toMatch(/\w.*/);
    expect(names[2]).toMatch(/\w.*/);
    expect(names[3]).toMatch(/\w.*/);
  });

  test("should return random element from array", () => {
    const arr = ["a", "b", "c", "d"];

    const item = sample(arr);

    expect(item).toBeDefined();
    expect(arr.includes(item!)).toBe(true);
  });

  test("should return undefined when sampling empty array", () => {
    const item = sample([]);
    expect(item).toBeUndefined();
  });
});
