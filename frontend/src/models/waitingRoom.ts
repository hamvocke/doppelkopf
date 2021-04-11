import { Game } from "@/models/game";
import { Player } from "@/models/player";
import { Config } from "@/models/config";
import { http } from "@/helpers/httpClient";
import { Event, WebsocketClient } from "@/helpers/websocketClient";
import { generateNames } from "@/models/random";
import { TablePosition } from "./tablePosition";

export enum RoomState {
  waiting = "waiting",
  ready = "ready"
}

/*

Creating:
1. create new multiplayer game: POST /api/game
2. parse id from response
3. redirect to room with id given in response
4. join room with id (see below)
5. show "invite" link that includes ID

Joining:
1. parse id from URL
2. fetch game info via GET /api/game/<id>
3. parse response, get player info
5. create waiting room instance
6. connect websocket
7. send "join" event with current player information
8. listen for other "joined" events
9. be aware that joining/leaving can also happen in-game
  * in waiting room phase: add/remove player from list
  * in game phase: change online presence

Starting:
1. if game status == waiting: don't allow
2. if game status == ready: allow
3. owner sends "game start" event with their canonical list of players
4. everyone listens for "game started" event
5. balance players (everyone's own player should become bottom player)
6. start game locally, pass balanced players
7. redirect game via router? what happens on refresh?
8. start listening to play events

*/

export class WaitingRoom {
  gameId: string;
  owner: Player;
  players: Player[];
  websocket: WebsocketClient;

  constructor(gameId: string, players: Player[]) {
    this.gameId = gameId;
    this.players = players;
    this.owner = players[0];
    this.websocket = new WebsocketClient();
  }

  get state() {
    if (this.players.length === 4) {
      return RoomState.ready;
    } else {
      return RoomState.waiting;
    }
  }

  get gameUrl() {
    return `${Config.backend_base_url}/${this.gameId}`;
  }

  join(player: Player) {
    if (!player) return;

    if (this.state === RoomState.ready) {
      throw new Error("Room is full");
    }

    if (this.players.length === 0) {
      this.owner = player;
    }

    this.players.push(player);

    this.websocket?.connect();

    const joinPayload = {
      game: {
        id: this.gameId
      },
      player: {
        id: player.id,
        name: player.name
      }
    };

    this.websocket?.emit(Event.join, joinPayload);
  }

  startGame() {
    if (this.state !== RoomState.ready) {
      throw new Error("Can't start game until 4 players are there");
    }

    // TODO: emit event via multiplayer handler

    // TODO: rebalance players here
    return Game.multiPlayer(this.players);
  }

  leave(player: Player) {
    if (!this.players.some(p => p.id === player.id))
      throw new Error(`Player '${player.name}' is not in this room`);

    this.players = this.players.filter(p => p.id !== player.id);

    // TODO: emit "leave" event
  }
}
