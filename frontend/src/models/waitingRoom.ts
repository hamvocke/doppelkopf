import { MultiplayerHandler } from "@/helpers/multiplayerHandler";
import { Event } from "@/helpers/websocketClient";
import { Config } from "@/models/config";
import { Player } from "@/models/player";

export class WaitingRoom {
  players: Player[] = [];
  owner?: Player;
  gameName: number;
  error?: string;
  multiplayer = new MultiplayerHandler();
  isLoading = true;

  constructor(gameName: number) {
    this.gameName = gameName;
    this.multiplayer.on(Event.joined, (players: Player[]) =>
      this.handleJoined(players)
    );
    this.multiplayer.on(Event.error, this.handleError);
  }

  get gameUrl() {
    return `${Config.base_url}/#/wait/${this.gameName}`;
  }

  get isReady() {
    return this.players?.length === 4;
  }

  join(player: Player) {
    this.multiplayer.sendJoinEvent(this.gameName, player);
  }

  handleJoined(players: Player[]) {
    players.forEach(p => {
      if (!p.remoteId) {
        return;
      }

      const known = this.players.map((p: Player) => p.remoteId);

      // TODO: try to reconnect players to their previously known position
      if (known.includes(p.remoteId)) {
        return;
      }

      if (this.isReady) {
        this.error = "error-room-full";
        return;
      }

      if (this.players.length === 0) {
        this.owner = p;
      }

      this.players = [...this.players, p];
    });

    this.isLoading = false;
  }

  handleError(error: string) {
    this.isLoading = false;
    this.error = error;
  }
}
