import { re, kontra } from "@/models/parties";
import { flatMap } from "lodash";

const sumPointsForParty = (acc, player) => acc + player.points();

export const WIN = "win";
export const BEAT_RE = "beat_re";

export class Score {
  constructor() {
    this.extras = {};
    this.extras[re] = [];
    this.extras[kontra] = [];
  }

  evaluate(players) {
    this.parties = this.findParties(players);
    this.rePoints = this.parties[re].reduce(sumPointsForParty, 0);
    this.kontraPoints = this.parties[kontra].reduce(sumPointsForParty, 0);

    if (this.rePoints + this.kontraPoints !== 240) {
      throw Error(
        `A score must have a total of 240 points. Got
        ${this.rePoints} for Re, ${this.kontraPoints} for Kontra`
      );
    }

    if (this.rePoints > this.kontraPoints) {
      this.addExtra(re, WIN);
    } else {
      this.addExtra(kontra, WIN);
      this.addExtra(kontra, BEAT_RE);
    }
  }

  findParties(players) {
    return {
      [re]: players.filter(player => player.isRe()),
      [kontra]: players.filter(player => player.isKontra())
    };
  }

  winner() {
    return this.parties[this.winningParty()];
  }

  winningParty() {
    return this.rePoints > this.kontraPoints ? re : kontra;
  }

  losingParty() {
    return this.rePoints > this.kontraPoints ? kontra : re;
  }

  points() {
    return this.winner() === this.parties[re] ? 1 : 2;
  }

  addExtra(party, extraKey) {
    const extra = {};
    extra[extraKey] = 1;
    this.extras[party].push(extra);
  }

  listExtras(party) {
    return flatMap(this.extras[party], extra => Object.keys(extra));
  }
}
