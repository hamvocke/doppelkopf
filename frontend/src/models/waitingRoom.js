import { generateNameId } from "@/models/random";
import { Game } from "@/models/game";
import { Player } from "@/models/player";
import { Config } from "@/models/config";
import { http } from "@/helpers/httpClient";

export const states = {
  waiting: "waiting",
  joined: "joined",
  ready: "ready"
};

export class WaitingRoom {
  constructor(gameId = null, players = []) {
    this.gameId = gameId || generateNameId();
    this.players = players;
  }

  get state() {
    if (this.players.length === 4) {
      return states.ready;
    } else if (this.players.some(p => p.isMe)) {
      return states.joined;
    } else {
      return states.waiting;
    }
  }

  get gameUrl() {
    return `${Config.baseUrl}/${this.gameId}`;
  }

  // TODO: multiplayer join:
  static async fetch(gameName) {
    // [x] get room info from server
    // [x] get response
    // [x] create local representation of room (new WaitingRoom(...))
    // [ ] show waiting room with players who are present as long as state === "waiting"
    // [ ] ask player for their name
    // [ ] on name submit: waitingRoom.join(playerName)
    // [ ] change room state to "joined"

    let gameInfo;

    try {
      const response = await http.get(`/api/game/${gameName}/join`);
      gameInfo = await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch game state: ${error}`);
    }

    const waitingPlayers = gameInfo.players.map(
      player => new Player(player.name, true, false)
    );

    const room = new WaitingRoom(gameInfo.gameId, waitingPlayers);

    return room;
  }

  // join(playerName) {
  //   const myPlayerName = playerName || generateNames(1);
  //   const myPlayer = new Player(myPlayerName, true, true);
  //   room.join(myPlayer);
  // }

  join(player) {
    if (!player) return;

    if (this.state === states.ready) {
      throw new Error("Room is full");
    }

    this.players.push(player);
  }

  startGame() {
    if (this.state !== states.ready) {
      throw new Error("Can't start game until 4 players are there");
    }

    return Game.multiPlayer(this.players);
  }

  leave(player) {
    if (!this.players.some(p => p.id === player.id))
      throw new Error(`Player '${player.name}' is not in this room`);

    this.players = this.players.filter(p => p.id !== player.id);
  }
}
