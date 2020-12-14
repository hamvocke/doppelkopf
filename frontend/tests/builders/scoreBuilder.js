import { Score } from "@/models/score";
import { re, kontra, Party } from "@/models/party";

export class ScoreBuilder {
  constructor() {
    this.extras = { re: [], kontra: [] };
    this.points = { re: 0, kontra: 0 };
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
    this.points[re] = points;
    this.points[kontra] = -points;
    return this;
  }

  withRePoints(points) {
    this.points[re] = points;
    return this;
  }

  withKontraPoints(points) {
    this.points[kontra] = points;
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
    score.winner = () => this.winningParty;
    score.totalPoints = (partyName) => this.points[partyName];
    score.listExtras = partyName => this.extras[partyName];
    return score;
  }
}
