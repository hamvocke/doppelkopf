import { http } from "@/helpers/httpClient";
import { Player } from "@/models/player";
import { WebsocketClient, Event } from "@/helpers/websocketClient";

/**
 * Takes care of creating a new multiplayer game or establishing a connection to
 * a game that's been started by another player.
 * Handles all HTTP and WebSocket connections required to play a multiplayer game.
 */
export class MultiplayerHandler {
  private websocket: WebsocketClient = new WebsocketClient();

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

  async fetchRoom(gameName: string): Promise<CreateResponse> {
    try {
      const response = await http.get(`/api/game/${gameName}`);
      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }

      const roomInfo = (await response.json()) as CreateResponse;
      this.websocket.connect();
      return roomInfo;
    } catch (error) {
      throw new Error(`Failed to fetch room state: ${error}`);
    }
  }

  joinRoom(gameId: any, player: Player) {
    const joinPayload = {
      game: {
        id: gameId
      },
      player: {
        remoteId: player.remoteId,
        name: player.name
      }
    };

    this.websocket?.emit(Event.join, joinPayload);
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
