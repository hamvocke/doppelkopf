import { re, kontra } from "@/models/parties";

const sumPointsForParty = (acc, player) => acc + player.points();

export class Score {
  constructor(players) {
    this.parties = this.findParties(players);
    this.rePoints = this.parties[re].reduce(sumPointsForParty, 0);
    this.kontraPoints = this.parties[kontra].reduce(sumPointsForParty, 0);

    if (this.rePoints + this.kontraPoints !== 240) {
      throw Error(
        `A score must have a total of 240 points. Got
        ${this.rePoints} for Re, ${this.kontraPoints} for Kontra`
      );
    }
  }

  findParties(players) {
    return {
      [re]: players.filter(player => player.isRe()),
      [kontra]: players.filter(player => player.isKontra())
    };
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
