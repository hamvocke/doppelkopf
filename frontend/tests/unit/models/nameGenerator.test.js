import { generate } from "@/models/nameGenerator";

describe("Name Generator", () => {
  test("should generate random names", () => {
    expect(generate()).toMatch(/\w.*/);
  });
});
