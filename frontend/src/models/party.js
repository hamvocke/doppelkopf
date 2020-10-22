export const re = "Re";
export const kontra = "Kontra";

export class Party {
  constructor(name, ...players) {
    this.name = name;
    this.players = players;
  }

  points() {
    return this.players.reduce((acc, player) => acc + player.points(), 0);
  }

  madeAnyAnnouncments() {
    return this.announcements().length > 0;
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
