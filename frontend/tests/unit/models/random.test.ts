import { generateNames } from "@/models/random";

describe("Random", () => {
  test("should generate multiple random names", () => {
    const names = generateNames(4);
    expect(names).toHaveLength(4);
    expect(names[0]).toMatch(/\w.*/);
    expect(names[1]).toMatch(/\w.*/);
    expect(names[2]).toMatch(/\w.*/);
    expect(names[3]).toMatch(/\w.*/);
  });
});
