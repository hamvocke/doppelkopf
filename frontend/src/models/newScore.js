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
    const reAnnouncements = this.parties[re].announcements();
    const kontraAnnouncements = this.parties[kontra].announcements();

    let reWinningThreshold = 121;
    let kontraWinningThreshold = 120;

    if (
      kontraAnnouncements.includes(announcements.kontra) &&
      !reAnnouncements.includes(announcements.re)
    ) {
      reWinningThreshold = 120;
      kontraWinningThreshold = 121;
    }

    if (reAnnouncements.includes(announcements.no_90)) {
      reWinningThreshold = 151;
      kontraWinningThreshold = this.parties[kontra].madeAnyAnnouncments()
        ? kontraWinningThreshold
        : 90;
    }

    if (reAnnouncements.includes(announcements.no_60)) {
      reWinningThreshold = 181;
      kontraWinningThreshold = this.parties[kontra].madeAnyAnnouncments()
        ? kontraWinningThreshold
        : 60;
    }

    if (reAnnouncements.includes(announcements.no_30)) {
      reWinningThreshold = 211;
      kontraWinningThreshold = this.parties[kontra].madeAnyAnnouncments()
        ? kontraWinningThreshold
        : 30;
    }

    if (reAnnouncements.includes(announcements.no_points)) {
      reWinningThreshold = 240;
      kontraWinningThreshold = this.parties[kontra].madeAnyAnnouncments()
        ? kontraWinningThreshold
        : 1;
    }

    if (kontraAnnouncements.includes(announcements.no_90)) {
      kontraWinningThreshold = 151;
      reWinningThreshold = this.parties[re].madeAnyAnnouncments()
        ? reWinningThreshold
        : 90;
    }

    if (kontraAnnouncements.includes(announcements.no_60)) {
      kontraWinningThreshold = 181;
      reWinningThreshold = this.parties[re].madeAnyAnnouncments()
        ? reWinningThreshold
        : 60;
    }

    if (kontraAnnouncements.includes(announcements.no_30)) {
      kontraWinningThreshold = 211;
      reWinningThreshold = this.parties[re].madeAnyAnnouncments()
        ? reWinningThreshold
        : 30;
    }

    if (kontraAnnouncements.includes(announcements.no_points)) {
      kontraWinningThreshold = 240;
      reWinningThreshold = this.parties[re].madeAnyAnnouncments()
        ? reWinningThreshold
        : 1;
    }

    if (this.parties[re].points() >= reWinningThreshold) {
      return re;
    }

    if (this.parties[kontra].points() >= kontraWinningThreshold) {
      return kontra;
    }

    return null;
  }

  losingPartyName() {
    if (this.winningPartyName() === null) {
      return null;
    }

    return this.winningPartyName() === re ? kontra : re;
  }

  points(partyName) {
    const sumPoints = (accumulator, extra) => accumulator + extra.points;
    return [...this.listExtras(partyName)].reduce(sumPoints, 0);
  }

  totalPoints() {
    const winner = this.winningPartyName() || re;
    const loser = this.losingPartyName() || kontra;

    return Math.abs(this.points(winner) - this.points(loser));
  }

  _hasAnyPartyAnnounced(announcement) {
    return Object.values(this.parties).some(party =>
      party.announcements().includes(announcement)
    );
  }

  listExtras(partyName) {
    const allExtras = new Set();
    const partyPoints = this.parties[partyName].points();
    const partyAnnouncements = this.parties[partyName].announcements();
    const opponentAnnouncements = this.parties[partyName == re ? kontra : re].announcements();

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

      if (partyPoints > 150) {
        allExtras.add(extras.no_90);
      }

      if (partyAnnouncements.includes(announcements.no_90)) {
        allExtras.add(extras.announced_no_90);
      }

      if (opponentAnnouncements.includes(announcements.no_90)) {
        allExtras.add(extras.opposing_party_announced_no_90);
      }

      if (
        partyPoints >= 120 &&
        opponentAnnouncements.includes(announcements.no_90)
      ) {
        allExtras.add(extras.got_120_against_no_90);
      }

      if (partyPoints > 180) {
        allExtras.add(extras.no_60);
      }

      if (partyAnnouncements.includes(announcements.no_60)) {
        allExtras.add(extras.announced_no_60);
      }

      if (opponentAnnouncements.includes(announcements.no_60)) {
        allExtras.add(extras.opposing_party_announced_no_60);
      }

      if (
        partyPoints >= 90 &&
        opponentAnnouncements.includes(announcements.no_60)
      ) {
        allExtras.add(extras.got_90_against_no_60);
      }

      if (partyPoints > 210) {
        allExtras.add(extras.no_30);
      }

      if (partyAnnouncements.includes(announcements.no_30)) {
        allExtras.add(extras.announced_no_30);
      }

      if (opponentAnnouncements.includes(announcements.no_30)) {
        allExtras.add(extras.opposing_party_announced_no_30);
      }

      if (
        partyPoints >= 60 &&
        opponentAnnouncements.includes(announcements.no_30)
      ) {
        allExtras.add(extras.got_60_against_no_30);
      }

      if (partyPoints === 240) {
        allExtras.add(extras.no_points);
      }

      if (partyAnnouncements.includes(announcements.no_points)) {
        allExtras.add(extras.announced_no_points);
      }

      if (opponentAnnouncements.includes(announcements.no_points)) {
        allExtras.add(extras.opposing_party_announced_no_points);
      }

      if (
        partyPoints >= 30 &&
        opponentAnnouncements.includes(announcements.no_points)
      ) {
        allExtras.add(extras.got_30_against_no_points);
      }
    }

    return allExtras;
  }
}
