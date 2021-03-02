import { Game } from "@/models/game";
import { Player } from "@/models/player";
import { Config } from "@/models/config";
import { http } from "@/helpers/httpClient";
import { WebsocketClient } from "@/helpers/websocketClient";
import { generateNames } from "@/models/random";
import { TablePosition } from "./tablePosition";

export const states = {
  waiting: "waiting",
  joined: "joined",
  ready: "ready"
};

export class WaitingRoom {
  owner: Player;
  gameId?: string;
  players: Player[];
  websocket?: WebsocketClient;

  constructor(owner?: Player) {
    if (!owner) {
      owner = new Player(generateNames(1)[0], true, true, TablePosition.Bottom);
    }

    this.owner = owner;
    this.gameId = undefined;
    this.players = [owner];
    this.websocket = new WebsocketClient();
  }

  get state() {
    if (this.players.length === 4) {
      return states.ready;
    } else if (this.players.some(p => p.isMe)) {
      return states.joined;
    } else {
      return states.waiting;
    }
  }

  get gameUrl() {
    return `${Config.backend_base_url}/${this.gameId}`;
  }

  async register() {
    try {
      const response = await http.post("/api/game");
      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }
      let gameInfo = await response.json();
      this.gameId = gameInfo.game.id;
      this.websocket?.connect(); // TODO: "connect" should always come with an immediate "join" event
    } catch (error) {
      throw new Error(`Failed to create multiplayer game: ${error}`);
    }
  }

  // TODO: multiplayer join:
  static async fetch(gameName: string) {
    // [x] get room info from server
    // [x] get response
    // [x] create local representation of room (new WaitingRoom(...))
    // [ ] balance player order - "me" should be at position "bottom"
    // [ ] show waiting room with players who are present as long as state === "waiting"

    let gameInfo;

    try {
      const response = await http.get(`/api/game/${gameName}`);
      gameInfo = await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch game state: ${error}`);
    }

    const waitingPlayers = gameInfo.game.players.map(
      (player: any) => new Player(player.name, true, false)
    );

    const room = new WaitingRoom(waitingPlayers[0]);
    room.players = waitingPlayers;
    room.gameId = gameInfo.game.id;
    room.websocket?.connect();
    return room;
  }

  join(player: Player) {
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

    return Game.multiPlayer(this.players);
  }

  leave(player: Player) {
    if (!this.players.some(p => p.id === player.id))
      throw new Error(`Player '${player.name}' is not in this room`);

    this.players = this.players.filter(p => p.id !== player.id);
  }
}
