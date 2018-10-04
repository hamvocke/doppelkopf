import { PlayerRepository } from "@/models/playerRepository";
import { Player } from "@/models/player";

const repo = new PlayerRepository();

describe("PlayerRepository", () => {
  test("should always be same instance", () => {
    const anotherRepo = new PlayerRepository();
    expect(repo).toBe(anotherRepo);
  });

  test("should find player by name", () => {
    const player = new Player("some name");
    repo.register(player);

    const foundPlayer = repo.findByName("some name");

    expect(foundPlayer).toBe(player);
  });
});
