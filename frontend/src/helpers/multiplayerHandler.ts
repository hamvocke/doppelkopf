import { http } from "@/helpers/httpClient";
import { Player } from "@/models/player";
import { WaitingRoom } from "@/models/waitingRoom";

/**
 * Takes care of creating a new multiplayer game or establishing a connection to
 * a game that's been started by another player.
 */
export class MultiplayerHandler {
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
      return new WaitingRoom(roomInfo.game.id, waitingPlayers);
    } catch (error) {
      throw new Error(`Failed to fetch room state: ${error}`);
    }
  }
}

export type CreateResponse = {
  game: {
    id: string;
    players: {
      name: string;
    }[];
  };
};
