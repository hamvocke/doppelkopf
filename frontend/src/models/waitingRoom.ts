import { MultiplayerHandler } from "@/helpers/multiplayerHandler";
import { Event } from "@/helpers/websocketClient";
import { Config } from "@/models/config";
import { Player } from "@/models/player";

export class WaitingRoom {
  players: Player[] = [];
  owner?: Player;
  gameName?: string;
  error?: string;
  multiplayer = new MultiplayerHandler();

  constructor() {
    this.multiplayer.on(Event.joined, this.handleJoined);
    this.multiplayer.on(Event.error, this.handleError);
  }

  get gameUrl() {
    return `${Config.base_url}/#/wait/${this.gameName}`;
  }

  handleJoined(data: Player[]) {
    console.log("handling 'joined' event");
  }

  handleError(error: string) {
    this.error = error;
  }
}
