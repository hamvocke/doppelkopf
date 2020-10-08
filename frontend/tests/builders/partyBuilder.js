import { Party } from "../../src/models/party";
import { PlayerBuilder } from "./playerBuilder";

export class PartyBuilder {
  constructor(party) {
    this.party = party;
  }

  withAnnouncements(announcements) {
    this.announcements = announcements;
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

    createdParty.announcements = () => this.announcements;
    createdParty.extras = () => this.extras;
    createdParty.points = () => this.points;

    return createdParty;
  }
}
