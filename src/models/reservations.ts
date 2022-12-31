import { Player } from "@/models/player";
import { RingQueue } from "./ringQueue";

export enum Reservation {
  None,
  QueenSolo,
  JackSolo,
  AceSolo,
  ClubsSolo,
  SpadesSolo,
  HeartsSolo,
  DiamondsSolo,
  Wedding,
}

export class Reservations {
  players: RingQueue<Player>;

  constructor(players: RingQueue<Player>) {
    this.players = players;
  }

  isEveryoneHealthy(): boolean {
    return this.players
      .asList()
      .map((p) => p.reservation)
      .every((r) => r == Reservation.None);
  }

  findGameType(): Reservation {
    const solos = this.findSolos();

    if (solos.length == 1) {
      return solos[0];
    }

    return Reservation.None;
  }

  private findSolos(): Reservation[] {
    const nonSoloTypes = [Reservation.None, Reservation.Wedding];
    return this.players
      .asList()
      .map((p) => p.reservation)
      .filter((r) => !nonSoloTypes.includes(r));
  }
}
