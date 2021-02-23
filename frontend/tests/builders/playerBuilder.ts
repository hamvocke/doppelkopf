import { Player } from "@/models/player";
import { re } from "@/models/party";
import { Extra } from "@/models/extras";

export class PlayerBuilder {
  name: string;
  points: number = 0;
  extras: Extra[] = [];
  party: string = "re";

  constructor(name: string) {
    this.name = name;
  }

  withPoints(points: number) {
    this.points = points;
    return this;
  }

  withParty(party: string) {
    this.party = party;
    return this;
  }

  withExtra(extra: Extra) {
    this.extras.push(extra);
  }

  build() {
    const player = new Player(this.name);
    player.isRe = () => this.party === re;
    player.isKontra = () => this.party !== re;
    player.points = () => this.points;
    player.trickStack.extras = () => this.extras;
    return player;
  }
}
