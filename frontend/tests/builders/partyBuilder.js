import { Party } from "../../src/models/party";
import { PlayerBuilder } from "./playerBuilder";

export class PartyBuilder {
  constructor(party) {
    this.party = party;
    this.players = [];
    this.announcements = new Set();
    this.extras = [];
  }

  withPlayer(player) {
    this.players.push(player);
    return this;
  }

  withAnnouncement(announcements) {
    this.announcements.add(announcements);
    return this;
  }

  withExtra(extra) {
    this.extras.push(extra);
    return this;
  }

  withPoints(points) {
    this.points = points;
    return this;
  }

  build() {
    if (this.players.length === 0) {
      this.players = [
        new PlayerBuilder(`a ${this.party} player`)
          .withParty(this.party)
          .build(),
        new PlayerBuilder(`another ${this.party} player`)
          .withParty(this.party)
          .build()
      ];
    } else {
      this.players.forEach(player => {
        player.party = this.party;
      });
    }

    const createdParty = new Party(this.party, ...this.players);
    createdParty.announcements = () => [...this.announcements];
    createdParty.extras = () => this.extras;
    createdParty.points = () => this.points;

    return createdParty;
  }
}
