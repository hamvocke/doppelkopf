import { uniqueId } from "lodash-es";

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
    this.gameId = uniqueId("room_");
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
  }
}
