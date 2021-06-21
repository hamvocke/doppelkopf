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
  gameName?: string;

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
