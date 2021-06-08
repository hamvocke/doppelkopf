import { http } from "@/helpers/httpClient";
/**
 * Takes care of creating a new multiplayer game or establishing a connection to
 * a game that's been started by another player.
 * Handles all HTTP and WebSocket connections required to play a multiplayer game.
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
