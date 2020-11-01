import { re, kontra, findParties } from "@/models/party";
import { extras, extraThresholds } from "@/models/extras";

export class Score {
  constructor() {
    this.extras = {};
    this.extras[re] = [];
    this.extras[kontra] = [];
  }

  evaluate(players) {
    this.parties = findParties(players);
    this.rePoints = this.parties[re].points();
    this.kontraPoints = this.parties[kontra].points();

    this.reAnnouncements = this.parties[re].announcements();
    this.kontraAnnouncements = this.parties[kontra].announcements();

    if (this.rePoints + this.kontraPoints !== 240) {
      throw Error(
        `A score must have a total of 240 points. Got
        ${this.rePoints} for Re, ${this.kontraPoints} for Kontra`
      );
    }

    const winnerParty = this.winningPartyName();
    this.addExtra(winnerParty, extras.win);

    if (winnerParty === kontra) {
      this.addExtra(kontra, extras.beat_re);
    }

    for (let [threshold, extra] of Object.entries(extraThresholds)) {
      if (this.rePoints < threshold) {
        this.addExtra(kontra, extra);
      }

      if (this.kontraPoints < threshold) {
        this.addExtra(re, extra);
      }
    }

    const reExtras = this.parties[re].extras();
    const kontraExtras = this.parties[kontra].extras();

    for (const extra of reExtras) {
      this.addExtra(re, extra);
    }

    for (const extra of kontraExtras) {
      this.addExtra(kontra, extra);
    }
  }

  winner() {
    return this.parties[this.winningPartyName()];
  }

  winningPartyName() {
    return this.rePoints > this.kontraPoints ? re : kontra;
  }

  losingPartyName() {
    return this.rePoints > this.kontraPoints ? kontra : re;
  }

  points() {
    return (
      this.extras[this.winningPartyName()].length -
      this.extras[this.losingPartyName()].length
    );
  }

  addExtra(party, extra) {
    this.extras[party].push(extra);
  }

  listExtras(party) {
    return this.extras[party];
  }
}
