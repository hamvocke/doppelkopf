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

    <div v-else-if="waitingRoom" class="wrapper">
      <h3>
        {{ $t("hey-player", { name: currentPlayerName }) }}
      </h3>
      <p>
        {{ $t("here-is-your-invite-link") }}
      </p>
      <div class="link">
        <CopyText :text="waitingRoom.gameUrl" />
      </div>
      <div class="roomInfo">
        <p>{{ $t("you-can-start") }}</p>
        <p>
          {{
            $tc("n-players-are-here", waitingRoom.players.length, {
              count: waitingRoom.players.length
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
        v-if="isReady()"
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
import { MultiplayerHandler } from "@/helpers/multiplayerHandler";
import { Event } from "@/helpers/websocketClient";
import CopyText from "@/components/CopyText.vue";
import { Player } from "@/models/player";
import { RoomState, WaitingRoom as WaitingRoomModel } from "@/models/waitingRoom";
import { CloudOffIcon } from "vue-feather-icons";
import { Config } from "@/models/config";

@Component({
  components: { CopyText, CloudOffIcon }
})
export default class WaitingRoom extends Vue {
  @Prop({ required: true })
  gameName!: string;

  isLoading = false;
  error?: String = undefined;
  multiplayer = new MultiplayerHandler();
  waitingRoom?: WaitingRoomModel;
  players?: Player[] = [];

  get currentPlayerName() {
    return this.waitingRoom?.players[0]?.name ?? "ho";
  }

  get statusMessage() {
    switch (this.waitingRoom?.state) {
      case RoomState.ready:
        return "ready-status";
      case RoomState.waiting:
        return "waiting-status";
    }
    return "waiting-status";
  }

  async created() {
    try {
      this.isLoading = true;
      this.error = undefined;
      this.waitingRoom = await this.multiplayer.fetchRoom(this.gameName);
      this.multiplayer.registerCallback(Event.joined, async () => await this.joined(null));
      this.multiplayer.joinRoom(Player.me());
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = "error-connection";
    }
  }

  async joined(data: any) {
    console.log("NEXT TICK!");
    await Vue.nextTick();
    this.players = this.waitingRoom?.players;
  }

  startGame() {
    this.waitingRoom?.startGame();
    this.$router.push("/play");
  }

  isReady() {
    return this.waitingRoom?.state === RoomState.ready;
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
