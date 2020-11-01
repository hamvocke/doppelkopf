export const re = "Re";
export const kontra = "Kontra";

export function findParties(players) {
  return {
    [re]: new Party(re, ...players.filter(player => player.isRe())),
    [kontra]: new Party(kontra, ...players.filter(player => player.isKontra()))
  };
}

export class Party {
  constructor(name, ...players) {
    this.name = name;
    this.players = players;
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
      []
    );
  }
}
