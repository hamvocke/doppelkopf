import { Extra } from "./extras";
import { Player } from "./player";

// TODO: enum
export const re = "Re";
export const kontra = "Kontra";

export function findParties(players: Player[]) {
  return {
    [re]: new Party(re, ...players.filter(player => player.isRe())),
    [kontra]: new Party(kontra, ...players.filter(player => player.isKontra()))
  };
}

export class Party {
  name: string;
  players: Player[];

  constructor(name: string, ...players: Player[]) {
    this.name = name;
    this.players = players;
  }

  isPlayingSolo() {
    return this.players.length === 1;
  }

  points() {
    return this.players.reduce((acc, player) => acc + player.points(), 0);
  }

  announcements() {
    return this.players.flatMap(p => [...p.announcements]);
  }

  extras() {
    return this.players.reduce(
      (acc, player) => acc.concat(player.trickStack.extras()),
      new Array<Extra>()
    );
  }
}