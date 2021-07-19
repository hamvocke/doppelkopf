import { MultiplayerHandler } from "@/helpers/multiplayerHandler";
import * as storage from "@/helpers/storage";
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
    this.multiplayer.on(Event.joined, this.handleJoined.bind(this));
    this.multiplayer.on(Event.left, this.handleLeft.bind(this));
    this.multiplayer.on(Event.error, this.handleError.bind(this));
  }

  get gameUrl() {
    return `${Config.base_url}/#/wait/${this.gameName}`;
  }

  get isReady() {
    return this.players?.length === 4;
  }

  get me() {
    return this.players.find(p => p.isMe);
  }

  join(player: Player) {
    this.multiplayer.sendJoinEvent(this.gameName, player);
  }

  handleJoined(players: Player[]) {
    players.forEach(p => {
      const known = this.players.map((p: Player) => p.id);

      // TODO: try to reconnect players to their previously known position
      if (known.includes(p.id)) {
        return;
      }

      if (this.isReady) {
        this.error = "error-room-full";
        return;
      }

      let storedPlayer = storage.loadPlayer();
      if (p.name === storedPlayer.name && p.id === storedPlayer.id) {
        p.isMe = true;
      }

      if (this.players.length === 0) {
        this.owner = p;
      }

      this.players = [...this.players, p];
    });

    this.isLoading = false;
  }

  handleLeft(players: Player[]) {
    const known = this.players.map((p: Player) => p.id);
    const remaining = players.map((p: Player) => p.id);
    const left = known.find(id => !remaining.includes(id));
    this.players = this.players.filter(p => p.id !== left);

    if (this.owner?.id === left) {
      this.owner = this.players[0];
    }
  }

  handleError(error: string) {
    this.isLoading = false;
    this.error = error;
  }
}
