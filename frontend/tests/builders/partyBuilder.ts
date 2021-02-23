import { Announcement } from "@/models/announcements";
import { Extra } from "@/models/extras";
import { Player } from "@/models/player";
import { Party } from "../../src/models/party";
import { PlayerBuilder } from "./playerBuilder";

export class PartyBuilder {
  party: string;
  players: Player[];
  announcements: Set<Announcement>;
  extras: Extra[];
  points: number;

  constructor(party: string) {
    this.party = party;
    this.players = [];
    this.announcements = new Set();
    this.extras = [];
    this.points = 0;
  }

  withPlayer(player: Player) {
    this.players.push(player);
    return this;
  }

  withAnnouncement(announcements: Announcement) {
    this.announcements.add(announcements);
    return this;
  }

  withExtra(extra: Extra) {
    this.extras.push(extra);
    return this;
  }

  withPoints(points: number) {
    this.points = points;
    return this;
  }

  build() {
    if (this.players === []) {
      this.players = [
        new PlayerBuilder(`a ${this.party} player`).build(),
        new PlayerBuilder(`another ${this.party} player`).build()
      ];
    }

    const createdParty = new Party(this.party, ...this.players);

    createdParty.announcements = () => [...this.announcements];
    createdParty.extras = () => this.extras;
    createdParty.points = () => this.points;

    return createdParty;
  }
}
