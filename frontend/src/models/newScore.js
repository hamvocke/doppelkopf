import { announcements } from "@/models/announcements";
import { extrasWithPoints as extras } from "@/models/extras";
import { re, kontra } from "./party";

export class NewScore {
  constructor(reParty, kontraParty) {
    this.parties = {};
    this.parties[re] = reParty;
    this.parties[kontra] = kontraParty;

    if (this.parties[re].points() + this.parties[kontra].points() !== 240) {
      throw Error(
        // eslint-disable-next-line prettier/prettier
        `A score must have a total of 240 points. Got ${this.parties[re].points()} for Re, ${this.parties[kontra].points()} for Kontra`
      );
    }
  }

  winningPartyName() {
    const kontraAnnounced = this.parties[kontra]
      .announcements()
      .includes(announcements.kontra);

    const reAnnounced = this.parties[re]
      .announcements()
      .includes(announcements.re);

    if (kontraAnnounced && !reAnnounced) {
      return this.parties[re].points() >= 120 ? re : kontra;
    }

    return this.parties[re].points() >= 121 ? re : kontra;
  }

  losingPartyName() {
    return this.winningPartyName() === re ? kontra : re;
  }

  points() {
    const sumPoints = (accumulator, extra) => accumulator + extra.points;
    return (
      [...this.listExtras(this.winningPartyName())].reduce(sumPoints, 0) -
      [...this.listExtras(this.losingPartyName())].reduce(sumPoints, 0)
    );
  }

  _hasAnyPartyAnnounced(announcement) {
    return Object.values(this.parties).some(party =>
      party.announcements().includes(announcement)
    );
  }

  listExtras(partyName) {
    const allExtras = new Set();

    if (partyName === this.winningPartyName()) {
      allExtras.add(extras.win);

      if (partyName === kontra) {
        allExtras.add(extras.beat_re);
      }

      if (this._hasAnyPartyAnnounced(announcements.re)) {
        allExtras.add(extras.announced_re);
      }

      if (this._hasAnyPartyAnnounced(announcements.kontra)) {
        allExtras.add(extras.announced_kontra);
      }
    }

    if (this.parties[partyName].points() > 150) {
      allExtras.add(extras.no_90);

      if (this.parties[partyName].announcements().includes(announcements.no_90)) {
        allExtras.add(extras.announced_no_90);
      }
    }

    if (this.parties[partyName].points() > 180) {
      allExtras.add(extras.no_60);

      if (this.parties[partyName].announcements().includes(announcements.no_60)) {
        allExtras.add(extras.announced_no_60);
      }
    }

    if (this.parties[partyName].points() > 210) {
      allExtras.add(extras.no_30);

      if (this.parties[partyName].announcements().includes(announcements.no_30)) {
        allExtras.add(extras.announced_no_30);
      }
    }

    if (this.parties[partyName].points() === 240) {
      allExtras.add(extras.no_points);

      if (this.parties[partyName].announcements().includes(announcements.no_points)) {
        allExtras.add(extras.announced_no_points);
      }
    }

    return allExtras;
  }
}
