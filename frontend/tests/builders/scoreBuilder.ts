import { Score } from "@/models/score";
import { re, kontra, Party } from "@/models/party";
import { Extra } from "@/models/extras";
import { Player } from "@/models/player";

export class ScoreBuilder {
  extras: { [party: string]: Extra[] };
  points: { [party: string]: number };
  winningParty?: Party;
  losingParty?: Party;

  constructor() {
    this.extras = { re: [], kontra: [] };
    this.points = { re: 0, kontra: 0 };
  }

  withWinners(partyName: string, ...players: Player[]) {
    this.winningParty = new Party(partyName, ...players);
    return this;
  }

  withLosers(partyName: string, ...players: Player[]) {
    this.losingParty = new Party(partyName, ...players);
    return this;
  }

  withPoints(points: number) {
    this.points[re] = points;
    this.points[kontra] = -points;
    return this;
  }

  withRePoints(points: number) {
    this.points[re] = points;
    return this;
  }

  withKontraPoints(points: number) {
    this.points[kontra] = points;
    return this;
  }

  withReExtras(extras: Extra[]) {
    this.extras[re] = extras;
    return this;
  }

  withKontraExtras(extras: Extra[]) {
    this.extras[kontra] = extras;
    return this;
  }

  build() {
    if (this.winningParty) {
      this.winningParty.points = () => 130;
    }

    if (this.losingParty) {
      this.losingParty.points = () => 110;
    }

    const score = new Score(this.winningParty!, this.losingParty!);
    score.winningPartyName = () => this.winningParty!.name;
    score.winner = () => this.winningParty;
    score.totalPoints = partyName => this.points[partyName];
    score.listExtras = partyName => this.extras[partyName];
    return score;
  }
}
