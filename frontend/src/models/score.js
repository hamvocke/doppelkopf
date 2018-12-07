import { re, kontra } from "@/models/parties";

const sumPointsForParty = (acc, player) => acc + player.points();

export const WIN = "win";
export const BEAT_RE = "beat_re";

export class Score {
  constructor() {
    this.reExtras = new Map();
    this.kontraExtras = new Map();
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
    return this.rePoints > this.kontraPoints
      ? this.parties[re]
      : this.parties[kontra];
  }

  points() {
    return this.winner() === this.parties[re] ? 1 : 2;
  }

  addExtra(party, extraKey) {
    if (party === re) {
      this.reExtras.set(extraKey, 1);
    } else if (party === kontra) {
      this.kontraExtras.set(extraKey, 1);
    }
  }

  listExtras(party) {
    if (party === re) {
      return this.reExtras;
    } else if (party === kontra) {
      return this.kontraExtras;
    }
  }
}
