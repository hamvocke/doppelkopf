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

  registerCallback(eventType: Event, callback: Function) {
    this.websocket.on(eventType, (data: any) => {
      callback(JSON.parse(data));
    });
  }

  // TODO: handleJoined()
  // try to reconnect players to their previously known position
  // needs to be handled in waiting room AND game

  // TODO: start game
  // -> send a "start" event

  // TODO: handleStarted()
  // -> make sure all waiting rooms call Game.multiplayer()

  // TODO: leave game
  // -> this should merely be a "disconnect", e.g. when the browser closes

  // TODO: handleLeft
  // -> update presence of player in game instance to "offline"
}

export type CreateResponse = {
  game: {
    id: string;
    players: {
      name: string;
    }[];
  };
};
