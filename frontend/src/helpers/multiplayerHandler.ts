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
    this.socket.on(Event.joined, this.handleJoined.bind(this));
    this.socket.on(Event.left, this.handleLeft.bind(this));
    this.socket.on(Event.error, this.handleError.bind(this));

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
        id: player.id,
        name: player.name
      }
    };

    this.socket.emit(Event.join, joinPayload);
  }

  on(event: Event, callback: (data: any) => void) {
    this.listeners[event].push(callback);
  }

  handleJoined(d: string) {
    let data: CreateResponse = JSON.parse(d);
    this.notifyAll(Event.joined, mapToPlayers(data));
  }

  handleLeft(d: string) {
    let data: CreateResponse = JSON.parse(d);
    this.notifyAll(Event.left, mapToPlayers(data));
  }

  handleError(data: string) {
    this.notifyAll(Event.error, data);
  }

  notifyAll(event: Event, data: any) {
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

function mapToPlayers(response: CreateResponse) {
  return response.game.players.map((p: any) => {
    const player = new Player(p.name, true, false);
    player.id = p.id;
    return player;
  });
}
