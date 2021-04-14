import { http } from "@/helpers/httpClient";
import { Player } from "@/models/player";
import { WaitingRoom } from "@/models/waitingRoom";
import { WebsocketClient, Event } from "@/helpers/websocketClient";

/**
 * Takes care of creating a new multiplayer game or establishing a connection to
 * a game that's been started by another player.
 * Handles all HTTP and WebSocket connections required to play a multiplayer game.
 */
export class MultiplayerHandler {
  private websocket: WebsocketClient = new WebsocketClient();
  private waitingRoom?: WaitingRoom;

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

  async fetchRoom(gameName: string): Promise<WaitingRoom> {
    try {
      const response = await http.get(`/api/game/${gameName}`);
      if (!response.ok) {
        throw new Error(`HTTP request failed with status ${response.status}`);
      }

      const roomInfo = (await response.json()) as CreateResponse;
      const waitingPlayers = roomInfo.game.players.map(
        (player: any) => new Player(player.name, true, false)
      );

      this.websocket.connect();
      this.websocket.on(Event.joined, this.onJoined);

      this.waitingRoom = new WaitingRoom(
        roomInfo.game.id,
        waitingPlayers,
        this
      );

      return this.waitingRoom;
    } catch (error) {
      throw new Error(`Failed to fetch room state: ${error}`);
    }
  }

  joinRoom(player: Player) {
    const joinPayload = {
      game: {
        id: this.waitingRoom?.gameId
      },
      player: {
        id: player.id,
        name: player.name
      }
    };

    this.websocket?.emit(Event.join, joinPayload);
  }

  onJoined(data: any) {
    console.log("received join event", data);
  }

  // TODO: handleJoined()
  // try to reconnect players to their previously known position
  // needs to be handled in waiting room AND game

  // TODO: start game
  // TODO: handleStarted()
  // -> make sure all waiting rooms call Game.multiplayer()

  // TODO: leave game

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
