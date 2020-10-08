import { announcements } from "@/models/announcements";
import { extras } from "@/models/extras";
import { re, kontra } from "./party";

export class NewScore {
  constructor(reParty, kontraParty) {
    this.parties = {};
    this.parties[re] = reParty;
    this.parties[kontra] = kontraParty;
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
    return 1;
  }

  listExtras(partyName) {
    const allExtras = new Set();

    if (partyName === this.winningPartyName()) {
      allExtras.add(extras.win);
    }

    return allExtras;
  }
}
