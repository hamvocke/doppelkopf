import { WaitingRoom, states } from "@/models/waitingRoom";
import { Player } from "@/models/player";

describe("Waiting Room", () => {
  const player = new Player("some player");

  test("should generate game id on creation", () => {
    const room = new WaitingRoom(player);
    expect(room.gameId).toBeDefined();
  });

  test("should be in 'waiting' state on start", () => {
    const room = new WaitingRoom(player);
    expect(room.state).toBe(states.waiting);
  });

  test("should keep track of owner", () => {
    const room = new WaitingRoom(player);
    expect(room.owner).toBe(player);
  });

  test("should throw if no owner is given", () => {
    const throws = () => new WaitingRoom();
    expect(throws).toThrow("No owning player given");
  });

  test("should wait for players", () => {
    const room = new WaitingRoom(player);
    expect(room.players).toEqual([player]);
  });

  test("should put new player in queue", () => {
    const room = new WaitingRoom(player);

    let player2 = new Player("player 2");
    let player3 = new Player("player 3");
    room.join(player2);
    room.join(player3);

    expect(room.players).toEqual([player, player2, player3]);
  });

  test("should not allow starting the game until 4 players are there", () => {
    const room = new WaitingRoom(player);

    const throws = () => room.startGame();

    expect(throws).toThrow("Can't start game until 4 players are there");
  });

  test("should change state to 'ready' once four players are there", () => {
    const room = new WaitingRoom(player);

    room.join(new Player("player 2"));
    room.join(new Player("player 3"));
    room.join(new Player("player 4"));

    expect(room.state).toBe(states.ready);
  });

  test("should not accept more than four players", () => {
    const room = new WaitingRoom(player);

    room.join(new Player("player 2"));
    room.join(new Player("player 3"));
    room.join(new Player("player 4"));

    const throws = () => room.join(new Player("player 5"));

    expect(throws).toThrow("Room is full");
  });

  test.todo("should change state to 'waiting' if a player leaves");

  test("should allow starting the game when game is ready", () => {

  });
});
