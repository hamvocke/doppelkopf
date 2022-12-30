import { Reservation, Reservations } from "@/models/reservations";
import { PlayerBuilder } from "../../builders/playerBuilder";

const player1 = new PlayerBuilder("one").build();
const player2 = new PlayerBuilder("two").build();
const player3 = new PlayerBuilder("three").build();
const player4 = new PlayerBuilder("four").build();

const allPlayers = [player1, player2, player3, player4];

describe("Reservations", () => {
  test("should initialize all players as 'healthy' by default", () => {
    const reservations = new Reservations(allPlayers);

    expect(reservations.isEveryoneHealthy()).toBe(true);
  });
});
