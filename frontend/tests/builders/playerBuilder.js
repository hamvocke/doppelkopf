import { Player } from "@/models/player";
import { re } from "@/models/party";

export class PlayerBuilder {
  constructor(name) {
    this.name = name;
  }

  withPoints(points) {
    this.points = points;
    return this;
  }

  withParty(party) {
    this.party = party;
    return this;
  }

  build() {
    const player = new Player(this.name);
    player.isRe = () => this.party === re;
    player.isKontra = () => this.party !== re;
    player.points = () => this.points;
    return player;
  }
}
