# Backend API

## Multiplayer Game

**HTTP**

| Method | Endpoint | Description |
| - | - | - |
| `HTTP POST` | `/api/game` | Create a new multiplayer game |
| `HTTP GET` | `/api/game/<game-slug>` | Load game with `game-slug`, establish Websocket connection |

### `POST /api/game`

**Request payload:** _none_

**Response:**

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

```js
{
  game: {
    slug: "cheeky-turtle",
    state: "waiting" | "started" | "finished"
  }
  players: [
    []
  ]
}
```

**What's happening:**

1. Generate a random game slug
2. Create a new game instance with game slug and an empty list of players
3. Persist game instance
4. Return game data

**Websockets**
| Direction | Event name | Description |
| - | - | - |
| `Client -> Server` | `join` | Join an existing multiplayer game that's in `waiting` state |
| `Server -> Client` | `joined` | Broadcast to existing players that a new player joined |
| `Client -> Server` | `disconnect` | A player closes the Websocket connection (e.g. on browser close, connection loss) |
| `Client -> Server` | `play-card` | A player plays a card |
| `Server -> Server` | `played-card` | Broadcast to players that a card has been played |

### `join`
1.


## Features

| Method | Endpoint | Description |
| - | - | - |
| `HTTP GET` | `/api/features` | Get all feature toggles' state |


## Metrics

| Method | Endpoint | Description |
| - | - | - |
| `HTTP GET` | `/api/` | Health check |
