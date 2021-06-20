<template>
  <div id="waitingRoom">
    <h1>Doppelkopf</h1>
    <div v-if="isLoading" class="loading">
      {{ $t("loading") }}
    </div>

    <div v-else-if="error" class="error">
      <cloud-off-icon size="32" class="icon" />
      {{ $t(error) }}
    </div>

    <div v-else class="wrapper">
      <h3>
        {{ $t("hey-player", { name: currentPlayerName }) }}
      </h3>
      <p>
        {{ $t("here-is-your-invite-link") }}
      </p>
      <div class="link">
        <CopyText :text="gameUrl" />
      </div>
      <div class="roomInfo">
        <p>{{ $t("you-can-start") }}</p>
        <p>
          {{
            $tc("n-players-are-here", players.length, {
              count: players.length
            })
          }}
          {{ $t(statusMessage) }}
        </p>
      </div>

      <div class="players">
        <ol>
          <li
            v-for="player in players"
            :key="player.id"
            class="player"
            :class="{ highlight: player.isMe }"
          >
            {{ player.name }}
          </li>
        </ol>
      </div>

      <button
        v-if="isReady"
        class="button start-game"
        tag="button"
        @click="startGame()"
      >
        {{ $t("start-game") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateResponse } from "@/helpers/multiplayerHandler";
import { Event, WebsocketClient } from "@/helpers/websocketClient";
import CopyText from "@/components/CopyText.vue";
import { Player } from "@/models/player";
import { CloudOffIcon } from "vue-feather-icons";
import { Config } from "@/models/config";

@Component({
  components: { CopyText, CloudOffIcon }
})
export default class WaitingRoom extends Vue {
  @Prop({ required: true })
  gameName!: string;

  isLoading = true;
  error?: String = undefined;
  socket = new WebsocketClient();
  players: Player[] = [];
  owner?: Player;

  get currentPlayerName() {
    if (this.players?.length === 0) {
      return null;
    }

    return this.players[0].name;
  }

  get isReady() {
    return this.players?.length === 4;
  }

  get statusMessage() {
    return this.isReady ? "ready-status" : "waiting-status";
  }

  get gameUrl() {
    return `${Config.base_url}/#/wait/${this.gameName}`;
  }

  created() {
    this.error = undefined;
    this.isLoading = true;
    this.socket.connect();
    this.socket.on(Event.joined, this.handleJoined);
    this.socket.on(Event.error, this.handleError);
    this.sendJoinEvent(Player.me());
  }

  sendJoinEvent(player: Player) {
    const joinPayload = {
      game: {
        id: this.gameName
      },
      player: {
        remoteId: player.remoteId,
        name: player.name
      }
    };

    this.socket.emit(Event.join, joinPayload);
  }

  handleJoined(d: any) {
    this.isLoading = false;
    let data: CreateResponse = JSON.parse(d);
    const players = data.game.players.map((p: any) => {
      const player = new Player(p.name, true, false);
      player.remoteId = p.id;
      return player;
    });

    players.forEach((p: Player) => this.updatePlayers(p));
  }

  updatePlayers(player: Player) {
    if (!player) return;

    if (!player.remoteId) {
      return;
    }

    const known = this.players.map((p: Player) => p.remoteId);

    if (known.includes(player.remoteId)) {
      return;
    }

    if (this.isReady) {
      this.error = "error-room-full";
      return;
    }

    if (this.players.length === 0) {
      this.owner = player;
    }

    this.players = [...this.players, player];
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

  handleError(data: string) {
    this.isLoading = false;
    this.players = [];
    this.error = data;
  }

  startGame() {
    if (this.isReady) {
      // TODO: rebalance players here
      // Game.multiPlayer(this.players);
      this.$router.push("/play");
    }
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

#waitingRoom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.error {
  background: var(--lightblue);
  color: var(--white);
  padding: 24px 32px;
  font-weight: bold;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  line-height: 1.4em;
}

.error .icon {
  margin-bottom: 32px;
}

.wrapper {
  background: var(--white);
  color: var(--black);
  padding: 32px;
  border-radius: 6px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 3em;
}

.link {
  background: var(--white);
  border-radius: 6px;
  min-width: 600px;
  margin: 16px 0;
  padding: 24px 24px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
}

p {
  color: var(--black);
  line-height: 1.6em;
}

.roomInfo {
  align-self: flex-start;
}

.state {
  margin-top: 64px;
}

.players {
  padding: 0 24px;
  margin: 24px 0;
  background: var(--lightblue);
  color: var(--white);
  display: block;
  min-width: 500px;
  border-radius: 12px;
  box-sizing: border-box;
}

ol {
  padding-left: 0;
  list-style-position: inside;
}

li.player {
  padding: 12px 0;
}

.highlight {
  font-weight: bold;
}
</style>
