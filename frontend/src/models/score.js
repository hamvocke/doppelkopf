import { re, kontra } from "@/models/parties";
import { WIN, BEAT_RE, NO_90, NO_60, NO_30, NO_POINTS } from "@/models/extras";

const sumPointsForParty = (acc, player) => acc + player.points();
const extrasInTrickStack = (acc, player) =>
  acc.concat(player.trickStack.extras());

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

    const winnerParty = this.winningParty();

    this.addExtra(winnerParty, WIN);

    if (winnerParty === kontra) {
      this.addExtra(kontra, BEAT_RE);
    }

    if (this.rePoints < 90) {
      this.addExtra(kontra, NO_90);
    }

    if (this.kontraPoints < 90) {
      this.addExtra(re, NO_90);
    }

    if (this.rePoints < 60) {
      this.addExtra(kontra, NO_60);
    }

    if (this.kontraPoints < 60) {
      this.addExtra(re, NO_60);
    }

    if (this.rePoints < 30) {
      this.addExtra(kontra, NO_30);
    }

    if (this.kontraPoints < 30) {
      this.addExtra(re, NO_30);
    }

    if (this.rePoints === 0) {
      this.addExtra(kontra, NO_POINTS);
    }

    if (this.kontraPoints === 0) {
      this.addExtra(re, NO_POINTS);
    }

    const reExtras = this.parties[re].reduce(extrasInTrickStack, []);
    const kontraExtras = this.parties[kontra].reduce(extrasInTrickStack, []);

    for (const extra of reExtras) {
      this.addExtra(re, extra);
    }

    for (const extra of kontraExtras) {
      this.addExtra(kontra, extra);
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
    return (
      this.extras[this.winningParty()].length -
      this.extras[this.losingParty()].length
    );
  }

  addExtra(party, extraKey) {
    if (!extraKey) {
      return;
    }
    const extra = {};
    extra[extraKey] = 1;
    this.extras[party].push(extra);
  }

  listExtras(party) {
    return this.extras[party].flatMap(extra => Object.keys(extra));
  }
}
