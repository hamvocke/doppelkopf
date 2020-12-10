import { Score } from "@/models/score";
import { re, kontra, Party } from "@/models/party";

export class ScoreBuilder {
  constructor() {
    this.extras = { re: [], kontra: [] };
  }

  withWinners(partyName, ...players) {
    this.winningParty = new Party(partyName, ...players);
    return this;
  }

  withLosers(partyName, ...players) {
    this.losingParty = new Party(partyName, ...players);
    return this;
  }

  withPoints(points) {
    this.points = points;
    return this;
  }

  withReExtras(extras) {
    this.extras[re] = extras;
    return this;
  }

  withKontraExtras(extras) {
    this.extras[kontra] = extras;
    return this;
  }

  build() {
    this.winningParty.points = () => 130;
    this.losingParty.points = () => 110;
    const score = new Score(this.winningParty, this.losingParty);
    score.winningPartyName = () => this.winningParty.name;
    score.totalPoints = (partyName) => partyName === this.winningParty.name ? this.points : -this.points;
    score.listExtras = partyName => this.extras[partyName];
    return score;
  }
}
