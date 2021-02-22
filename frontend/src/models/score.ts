import { announcements } from "@/models/announcements";
import { Extra, extras } from "@/models/extras";
import { re, kontra, Party } from "./party";

export class Score {
  parties: { [name: string]: Party };

  constructor(reParty: Party, kontraParty: Party) {
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
      kontraWinningThreshold =
        kontraAnnouncements.length > 0 ? kontraWinningThreshold : 90;
    }

    if (reAnnouncements.includes(announcements.no_60)) {
      reWinningThreshold = 181;
      kontraWinningThreshold =
        kontraAnnouncements.length > 0 ? kontraWinningThreshold : 60;
    }

    if (reAnnouncements.includes(announcements.no_30)) {
      reWinningThreshold = 211;
      kontraWinningThreshold =
        kontraAnnouncements.length > 0 ? kontraWinningThreshold : 30;
    }

    if (reAnnouncements.includes(announcements.no_points)) {
      reWinningThreshold = 240;
      kontraWinningThreshold =
        kontraAnnouncements.length > 0 ? kontraWinningThreshold : 1;
    }

    if (kontraAnnouncements.includes(announcements.no_90)) {
      kontraWinningThreshold = 151;
      reWinningThreshold = reAnnouncements.length > 0 ? reWinningThreshold : 90;
    }

    if (kontraAnnouncements.includes(announcements.no_60)) {
      kontraWinningThreshold = 181;
      reWinningThreshold = reAnnouncements.length > 0 ? reWinningThreshold : 60;
    }

    if (kontraAnnouncements.includes(announcements.no_30)) {
      kontraWinningThreshold = 211;
      reWinningThreshold = reAnnouncements.length > 0 ? reWinningThreshold : 30;
    }

    if (kontraAnnouncements.includes(announcements.no_points)) {
      kontraWinningThreshold = 240;
      reWinningThreshold = reAnnouncements.length > 0 ? reWinningThreshold : 1;
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

  winner() {
    let winningParty = this.winningPartyName();
    if (winningParty) {
      return this.parties[winningParty];
    }

    return undefined;
  }

  trickPoints(partyName: string) {
    return this.parties[partyName].points();
  }

  points(partyName: string) {
    const sumPoints = (accumulator: number, extra: Extra) => accumulator + extra.points;
    return [...this.listExtras(partyName)].reduce(sumPoints, 0);
  }

  totalPoints(partyName: string) {
    const otherPartyName = partyName === re ? kontra : re;
    const thisParty = this.parties[partyName] || this.parties[re];

    const delta = this.points(partyName) - this.points(otherPartyName);

    if (thisParty.isPlayingSolo()) {
      return delta * 3;
    }

    return delta;
  }

  _hasAnyPartyAnnounced(announcement: string) {
    return Object.values(this.parties).some(party =>
      party.announcements().includes(announcement)
    );
  }

  listExtras(partyName: string) {
    const allExtras = [];
    const partyPoints = this.parties[partyName].points();
    const partyAnnouncements = this.parties[partyName].announcements();
    const opponentAnnouncements = this.parties[
      partyName == re ? kontra : re
    ].announcements();

    if (partyName === this.winningPartyName()) {
      allExtras.push(extras.win);

      if (partyName === kontra) {
        allExtras.push(extras.beat_re);
      }

      if (this._hasAnyPartyAnnounced(announcements.re)) {
        allExtras.push(extras.announced_re);
      }

      if (this._hasAnyPartyAnnounced(announcements.kontra)) {
        allExtras.push(extras.announced_kontra);
      }

      if (partyPoints > 150) {
        allExtras.push(extras.no_90);
      }

      if (partyAnnouncements.includes(announcements.no_90)) {
        allExtras.push(extras.announced_no_90);
      }

      if (opponentAnnouncements.includes(announcements.no_90)) {
        allExtras.push(extras.opposing_party_announced_no_90);
      }

      if (
        partyPoints >= 120 &&
        opponentAnnouncements.includes(announcements.no_90)
      ) {
        allExtras.push(extras.got_120_against_no_90);
      }

      if (partyPoints > 180) {
        allExtras.push(extras.no_60);
      }

      if (partyAnnouncements.includes(announcements.no_60)) {
        allExtras.push(extras.announced_no_60);
      }

      if (opponentAnnouncements.includes(announcements.no_60)) {
        allExtras.push(extras.opposing_party_announced_no_60);
      }

      if (
        partyPoints >= 90 &&
        opponentAnnouncements.includes(announcements.no_60)
      ) {
        allExtras.push(extras.got_90_against_no_60);
      }

      if (partyPoints > 210) {
        allExtras.push(extras.no_30);
      }

      if (partyAnnouncements.includes(announcements.no_30)) {
        allExtras.push(extras.announced_no_30);
      }

      if (opponentAnnouncements.includes(announcements.no_30)) {
        allExtras.push(extras.opposing_party_announced_no_30);
      }

      if (
        partyPoints >= 60 &&
        opponentAnnouncements.includes(announcements.no_30)
      ) {
        allExtras.push(extras.got_60_against_no_30);
      }

      if (partyPoints === 240) {
        allExtras.push(extras.no_points);
      }

      if (partyAnnouncements.includes(announcements.no_points)) {
        allExtras.push(extras.announced_no_points);
      }

      if (opponentAnnouncements.includes(announcements.no_points)) {
        allExtras.push(extras.opposing_party_announced_no_points);
      }

      if (
        partyPoints >= 30 &&
        opponentAnnouncements.includes(announcements.no_points)
      ) {
        allExtras.push(extras.got_30_against_no_points);
      }
    }

    const extrasFromTricks = this.parties[partyName].extras();
    if (extrasFromTricks.length > 0) {
      allExtras.push(...extrasFromTricks);
    }

    return allExtras;
  }
}
