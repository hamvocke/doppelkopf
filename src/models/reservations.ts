import { Player } from "@/models/player";

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
  players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }

  isEveryoneHealthy(): boolean {
    return this.players
      .map((p) => p.reservation)
      .every((r) => r == Reservation.None);
  }
}
