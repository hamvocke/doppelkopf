# Backend API

## Multiplayer Game

Multiplayer games are created via HTTP communication. After a game has created, players can join a game by establishing a Websocket connection.

### HTTP Endpoints
| Method | Endpoint | Description |
| - | - | - |
| `HTTP POST` | `/api/game` | Create a new multiplayer game |
| `HTTP GET` | `/api/game/<game-slug>` | Load game with `game-slug`, establish Websocket connection |


### `POST /api/game`

**Request payload:** _none_

**Response**

`202 ACCEPTED` - if the game has been created
```js
{
  game: {
    slug: "cheeky-turtle",
    state: "waiting" | "started" | "finished"
  }
  "players": []
}
```

**What's happening:**

1. Generate a random game slug
2. Create a new game instance with game slug and an empty list of players
3. Persist game instance
4. Return game data

### `GET /api/game/<game-slug>`

**Request payload:** _none_

**Response:**

`200 OK` if a game with the given `game-slug` was found
```json

{
  "game": {
    "slug": "cheeky-turtle",
    "state": "waiting" | "started" | "finished"
  }
  "players": [
    { "name": "Jasmin" },
    { "name": "Hubert" },
    { "name": "Mohamed" },
    null
  ]
}
```

`404 NOT FOUND` if no game with the given `game-slug` could be found

**What's happening:**

1. Find game by `game-slug`
2. Return 404 if no game is found
3. Return game with list of players if game is found

---

### Websocket Events
| Direction | Event name | Description |
| - | - | - |
| `Client -> Server` | `join` | Join an existing multiplayer game that's in `waiting` state |
| `Server -> Client` | `joined` | Broadcast to existing players that a new player joined |
| `Client -> Server` | `disconnect` | A player closes the Websocket connection (e.g. on browser close, connection loss) |
| `Client -> Server` | `play-card` | A player plays a card |
| `Server -> Server` | `played-card` | Broadcast to players that a card has been played |

### `join`
This event is triggered right after a socket connection is opened. Upon joining, the `game-slug` and `player` must be sent as part of the payload.

**Payload:**

```json
{
  "game": {
    "slug": "cheeky-turtle"
  },
  "player": {
    "name": "Jasmin",
    "guid": "some-unique-guid"
  }
}
```

**Backend processing**:
1. Find game by `game-slug`
2. If no game could be found, return a `no-game-found` error
3. If the game is not in `waiting` state return a `cannot-join-game` error
4. Create a new `Player` instance with the provided `name` and `guid` fields
5. Attach the session ID (`request.sid` in Flask-SocketIO) to the `Player` instance
6. Join the _room_ (socket.io concept) with the name `game-slug`
7. Check if a player with the provide `guid` is already attached to the `Game`. If so, update that player so it contains the new session ID
8. If the player is not yet attached to the game, add it to the `Game`'s list of `Player`s.
9. Broadcast a `joined` event to the current room

### `joined`

The `joined` event is

## Features

| Method | Endpoint | Description |
| - | - | - |
| `HTTP GET` | `/api/features` | Get all feature toggles' state |


## Metrics

| Method | Endpoint | Description |
| - | - | - |
| `HTTP GET` | `/api/` | Health check |
