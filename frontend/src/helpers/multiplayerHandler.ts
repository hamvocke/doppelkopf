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
      this.websocket.on(Event.joined, (data: any) =>
        this.onJoined(JSON.parse(data))
      );

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
        remoteId: player.remoteId,
        name: player.name
      }
    };

    this.websocket?.emit(Event.join, joinPayload);
  }

  onJoined(data: any) {
    data.game.players
      .map((p: any) => {
        const player = new Player(p.name, true);
        player.remoteId = p.id;
        return player;
      })
      .forEach((p: Player) => this.waitingRoom?.join(p));
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
