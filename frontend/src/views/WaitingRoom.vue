<template>
  <div id="waitingRoom">
    <h1>Doppelkopf</h1>
    <div class="roomInfo">
      <span class="label">Game id</span>
      <CopyText :text="waitingRoom.gameId" />
      <p>
        Share your game id with your friends so they can join the game.
      </p>
      <p>You can start the game once 4 players have joined</p>
      <div class="state">{{ statusMessage }}</div>
    </div>

    <div class="players">
      <ol>
        <li
          v-for="player in waitingRoom.players"
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
</template>

<script>
import { WaitingRoom, states } from "@/models/waitingRoom";
import CopyText from "@/components/CopyText";

export default {
  name: "WaitingRoom",
  components: { CopyText },
  props: {
    waitingRoom: {
      type: Object,
      default: function() {
        return new WaitingRoom();
      }
    }
  },
  computed: {
    statusMessage: function() {
      switch (this.waitingRoom.state) {
        case states.ready:
          return "Ready to start the game";
        case states.waiting:
          return "Waiting for other players to join";
      }
      return "Waiting...";
    }
  },
  created() {
    // this.waitingRoom.join("Karl Heinz");
  },
  methods: {
    startGame: function() {
      this.waitingRoom.startGame();
      this.$router.push("/play");
    },
    isReady: function() {
      return this.waitingRoom.state === states.ready;
    }
  }
};
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

h1 {
  font-size: 3em;
}

.roomInfo {
  margin-bottom: 32px;
  max-width: 400px;
}

.label {
  font-size: 0.9em;
  margin-bottom: -12px;
}

.copyLink {
  margin: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gameId {
  padding: 12px;
  font-size: 1.8em;
  font-family: monospace;
}

.state {
  margin-top: 64px;
}

.players {
  padding: 0 24px;
  margin: 24px 0;
  background: var(--white);
  color: var(--black);
  display: block;
  min-width: 400px;
  border-radius: 8px;
  box-sizing: border-box;
}

ol {
  padding-left: 0;
  list-style-position: inside;
}

li.player {
  padding: 24px 0;
  border-bottom: 1px solid var(--lightgray);
}

li.player:last-of-type {
  border-bottom: none;
}

.highlight {
  font-weight: bold;
}
</style>