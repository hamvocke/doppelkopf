import { http } from "@/helpers/httpClient";
import { WebsocketClient, Event } from "@/helpers/websocketClient";
import { Player } from "@/models/player";
/**
 * Takes care of creating a new multiplayer game or establishing a connection to
 * a game that's been started by another player.
 * Handles all HTTP and WebSocket connections required to play a multiplayer game.
 */
export class MultiplayerHandler {
  socket = new WebsocketClient();
  listeners: { [eventName: string]: Function[] } = {};

  constructor() {
    this.socket.connect();
    this.socket.on(Event.joined, this.handleJoined);
    this.socket.on(Event.error, this.handleError);

    for (let event in Event) {
      this.listeners[event] = [];
    }
  }

  async register(): Promise<CreateResponse> {
    try {
      const response = await http.post("/api/game");
      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }
      return (await response.json()) as CreateResponse;
    } catch (error) {
      throw new Error(`Failed to create multiplayer game: ${error}`);
    }
  }

  sendJoinEvent(gameId: number, player: Player) {
    const joinPayload = {
      game: {
        id: gameId
      },
      player: {
        remoteId: player.remoteId,
        name: player.name
      }
    };

    this.socket.emit(Event.join, joinPayload);
  }

  on(event: Event, callback: (data: any) => void) {
    this.listeners[event].push(callback);
  }

  handleJoined(d: any) {
    let data: CreateResponse = JSON.parse(d);
    const allPlayers = data.game.players.map((p: any) => {
      const player = new Player(p.name, true, false);
      player.remoteId = p.id;
      return player;
    });

    this.notifyAll(Event.joined, allPlayers);
  }

  handleError(data: string) {
    this.notifyAll(Event.error, data);
  }

  private notifyAll(event: Event, data: any) {
    this.listeners[event].forEach(callback => {
      callback(data);
    });
  }
}

export type CreateResponse = {
  game: {
    id: number;
    players: {
      id: number;
      name: string;
    }[];
  };
};
