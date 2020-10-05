import { re, kontra, Party } from "@/models/party";
import { extras } from "@/models/extras";
import { announcements } from "@/models/announcements";

export class Score {
  constructor() {
    this.extras = {};
    this.extras[re] = [];
    this.extras[kontra] = [];
  }

  evaluate(players) {
    this.parties = this.findParties(players);
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

    const winnerParty = this.winningParty();

    this.addExtra(winnerParty, extras.win);

    if (winnerParty === re && this.reAnnouncements.includes(announcements.re)) {
      this.addExtra(re, extras.announced_re);
    }

    if (
      winnerParty === kontra &&
      this.reAnnouncements.includes(announcements.kontra)
    ) {
      this.addExtra(kontra, extras.announced_kontra);
    }

    if (winnerParty === kontra) {
      this.addExtra(kontra, extras.beat_re);
    }

    if (this.rePoints < 90) {
      this.addExtra(kontra, extras.no_90);
    }

    if (this.kontraPoints < 90) {
      this.addExtra(re, extras.no_90);
    }

    if (this.rePoints < 60) {
      this.addExtra(kontra, extras.no_60);
    }

    if (this.kontraPoints < 60) {
      this.addExtra(re, extras.no_60);
    }

    if (this.rePoints < 30) {
      this.addExtra(kontra, extras.no_30);
    }

    if (this.kontraPoints < 30) {
      this.addExtra(re, extras.no_30);
    }

    if (this.rePoints === 0) {
      this.addExtra(kontra, extras.no_points);
    }

    if (this.kontraPoints === 0) {
      this.addExtra(re, extras.no_points);
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

  findParties(players) {
    return {
      [re]: new Party(re, ...players.filter(player => player.isRe())),
      [kontra]: new Party(
        kontra,
        ...players.filter(player => player.isKontra())
      )
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
