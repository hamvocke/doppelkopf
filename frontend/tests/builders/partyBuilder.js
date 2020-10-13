import { Party } from "../../src/models/party";
import { PlayerBuilder } from "./playerBuilder";

export class PartyBuilder {
  constructor(party) {
    this.party = party;
    this.announcements = new Set();
  }

  withAnnouncement(announcements) {
    this.announcements.add(announcements);
    return this;
  }

  withExtras(extras) {
    this.extras = extras;
    return this;
  }

  withPoints(points) {
    this.points = points;
    return this;
  }

  build() {
    const createdParty = new Party(
      this.party,
      new PlayerBuilder(`a ${this.party} player`).build(),
      new PlayerBuilder(`another ${this.party} player`).build()
    );

    createdParty.announcements = () => [...this.announcements];
    createdParty.extras = () => this.extras;
    createdParty.points = () => this.points;

    return createdParty;
  }
}
