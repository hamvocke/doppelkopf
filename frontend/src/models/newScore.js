import { announcements } from "@/models/announcements";
import { extras } from "@/models/extras";
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
    return this.parties[re].points() > this.parties[kontra].points()
      ? re
      : kontra;
  }

  losingPartyName() {
    return this.winningPartyName() === re ? kontra : re;
  }

  points() {
    return (
      this.listExtras(this.winningPartyName()).size -
      this.listExtras(this.losingPartyName()).size
    );
  }

  listExtras(partyName) {
    const allExtras = new Set();

    if (partyName === this.winningPartyName()) {
      allExtras.add(extras.win);

      if (partyName === kontra) {
        allExtras.add(extras.beat_re);
      }
    }

    if (this.parties[partyName].points() > 150) {
      allExtras.add(extras.no_90);
    }

    if (this.parties[partyName].points() > 180) {
      allExtras.add(extras.no_60);
    }

    if (this.parties[partyName].points() > 210) {
      allExtras.add(extras.no_30);
    }

    if (this.parties[partyName].points() === 240) {
      allExtras.add(extras.no_points);
    }

    return allExtras;
  }
}
