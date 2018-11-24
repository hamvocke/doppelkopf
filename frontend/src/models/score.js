import { re, kontra } from "@/models/parties";

export class Score {
  constructor(players) {
    this.parties = {
      [re]: players.filter(player => player.isRe()),
      [kontra]: players.filter(player => player.isKontra())
    };

    const sumPointsForParty = (acc, player) => acc + player.points();
    this.rePoints = this.parties[re].reduce(sumPointsForParty, 0);
    this.kontraPoints = this.parties[kontra].reduce(sumPointsForParty, 0);

    if (this.rePoints + this.kontraPoints !== 240) {
      throw Error(
        `A score must have a total of 240 points. Got
        ${this.rePoints} for Re, ${this.kontraPoints} for Kontra`
      );
    }
  }

  winner() {
    return this.rePoints > this.kontraPoints
      ? this.parties[re]
      : this.parties[kontra];
  }

  points() {
    return 1;
  }
}
