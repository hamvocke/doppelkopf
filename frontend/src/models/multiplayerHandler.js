import { http } from "@/helpers/httpClient";
import { Player } from "@/models/player";
import { WaitingRoom } from "@/models/waitingRoom";
import { generateNames } from "@/models/random";

class _MultiplayerHandler {
  async joinWaitingRoom(gameName, playerName = null) {
    let gameInfo;
    try {
      const response = await http.get(`/api/game/${gameName}`);
      gameInfo = await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch game state: ${error}`);
    }

    const waitingPlayers = gameInfo.players.map(
      player => new Player(player.name, true, false)
    );

    const room = new WaitingRoom(gameInfo.gameId, waitingPlayers);
    const myPlayerName = playerName || generateNames(1);
    const myPlayer = new Player(myPlayerName, true, true);
    room.join(myPlayer);

    return room;
  }
}

export const MultiplayerHandler = new _MultiplayerHandler();
