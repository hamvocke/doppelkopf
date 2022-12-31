import { Reservation, Reservations } from "@/models/reservations";
import { RingQueue } from "@/models/ringQueue";
import { PlayerBuilder } from "../../builders/playerBuilder";

const player1 = new PlayerBuilder("one").build();
const player2 = new PlayerBuilder("two").build();
const player3 = new PlayerBuilder("three").build();
const player4 = new PlayerBuilder("four").build();

const players = new RingQueue([player1, player2, player3, player4]);

beforeEach(() => {
  // reset reservations and anything else, to make sure they don't stick around between tests
  players.asList().forEach((p) => p.reset());
});

describe("Reservations", () => {
  test("should initialize all players as 'healthy' by default", () => {
    const reservations = new Reservations(players);

    expect(reservations.isEveryoneHealthy()).toBe(true);
  });

  test("should detect if a player declares a reservation", () => {
    player3.declareReservation(Reservation.QueenSolo);

    const reservations = new Reservations(players);

    expect(reservations.isEveryoneHealthy()).toBe(false);
  });

  test("should come up with a normal game if each player is 'healthy'", () => {
    const reservation = new Reservations(players);

    expect(reservation.findGameType()).toEqual(Reservation.None);
  });

  test("should come up with a solo game if a player declares a solo", () => {
    player4.declareReservation(Reservation.AceSolo);

    const reservation = new Reservations(players);

    expect(reservation.findGameType()).toEqual(Reservation.AceSolo);
  });
});
