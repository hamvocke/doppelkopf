import * as storage from "@/helpers/storage";
import { Player } from "@/models/player";

describe("Player Repository", () => {
  afterEach(() => {
    storage.dropPlayer();
  });

  test("should generate empty player when loading from empty repo", () => {
    storage.savePlayer(new Player("whatever"));

    storage.dropPlayer();
    const player = storage.loadPlayer();

    expect(player.name).toBeDefined();
    expect(player.isHuman).toBe(true);
    expect(player.isMe).toBe(true);
  });

  test("should persist auto generated player for subsequent loads", () => {
    const player = storage.loadPlayer();

    const samePlayer = storage.loadPlayer();

    expect(player.name).toEqual(samePlayer.name);
  });

  test("should save and load player", () => {
    const player = new Player("some player");

    storage.savePlayer(player);
    const loadedPlayer = storage.loadPlayer();

    expect(loadedPlayer.name).toEqual(player.name);
    expect(loadedPlayer.isHuman).toBe(true);
    expect(loadedPlayer.isMe).toBe(true);
  });
});
