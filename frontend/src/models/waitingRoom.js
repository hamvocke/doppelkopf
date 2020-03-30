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
    this.players = [player];
  }

  get state() {
    return this.players.length === 4 ? states.ready : states.waiting;
  }

  join(player) {
    if (!player) return;

    if (this.state === states.ready) {
      throw new Error("Room is full");
    }

    this.players.push(player);
  }

  startGame() {
    if (this.state !== states.ready) {
      throw new Error("Can't start game until 4 players are there");
    }

    return new Game();
  }

  leave(player) {
    if (!this.players.some(p => p.id === player.id))
      throw new Error(`Player '${player.name}' is not in this room`);

    this.players = this.players.filter(p => p.id !== player.id);
  }
}
