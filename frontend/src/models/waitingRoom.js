import { generateNameId } from "@/models/random";
import { Game } from "@/models/game";
import { Player } from "@/models/player";

export const states = {
  waiting: "waiting",
  ready: "ready",
  started: "started"
};

export class WaitingRoom {
  constructor() {
    this.gameId = generateNameId();
    this.players = [];
  }

  get state() {
    return this.players.length === 4 ? states.ready : states.waiting;
  }

  join(playerName) {
    if (!playerName) return;

    if (this.state === states.ready) {
      throw new Error("Room is full");
    }

    this.players.push(new Player(playerName, true, false));
  }

  startGame() {
    if (this.state !== states.ready) {
      throw new Error("Can't start game until 4 players are there");
    }

    return Game.multiPlayer(this.players);
  }

  leave(playerName) {
    if (!this.players.some(p => p.name === playerName))
      throw new Error(`Player '${playerName}' is not in this room`);

    this.players = this.players.filter(p => p.name !== playerName);
  }
}
