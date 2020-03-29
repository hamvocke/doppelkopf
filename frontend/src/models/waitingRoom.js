import { generateNameId } from "@/models/random";
import { Game } from "@/models/game";

export const states = {
  waiting: "waiting",
  ready: "ready",
  started: "started"
};

export class WaitingRoom {
  constructor(player) {
    if (!player) {
      throw new Error("No owning player given");
    }

    this.owner = player;
    this.gameId = generateNameId();
    this.state = states.waiting;
    this.players = [player];
  }

  join(player) {
    if (!player) return;

    if (this.state === states.ready) {
      throw new Error("Room is full");
    }

    this.players.push(player);
    this.state = this.players.length === 4 ? states.ready : states.waiting;
  }

  startGame() {
    if (this.state !== states.ready) {
      throw new Error("Can't start game until 4 players are there");
    }

    return new Game();
  }
}
