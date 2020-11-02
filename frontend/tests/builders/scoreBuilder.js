import { Score } from "@/models/score";
import { Party } from "@/models/party";

export class ScoreBuilder {
  constructor() {}

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

  build() {
    this.winningParty.points = () => 130;
    this.losingParty.points = () => 110;
    const score = new Score(this.winningParty, this.losingParty);
    score.winningPartyName = () => this.winningParty.name;
    score.totalPoints = () => this.points;
    return score;
  }
}
