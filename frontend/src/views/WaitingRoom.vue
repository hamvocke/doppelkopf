<template>
  <div id="waitingRoom">
    <h1>Doppelkopf</h1>
    <div class="wrapper">
      <div class="link">
        <span class="label">Your invite link:</span>
        <CopyText :text="waitingRoom.gameUrl" />
      </div>
      <div class="roomInfo">
        <p>
          Share this link with your friends so they can join the game.
        </p>
        <p>You can start the game once 4 players have joined.</p>
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
  </div>
</template>

<script>
import { WaitingRoom, states } from "@/models/waitingRoom";
import CopyText from "@/components/CopyText";

export default {
  name: "WaitingRoom",
  components: { CopyText },
  props: {
    gameId: {
      type: Number,
      default: -1
    },
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

.wrapper {
  background: var(--white);
  color: var(--black);
  padding: 32px;
  border-radius: 12px;
}

h1 {
  font-size: 3em;
}

.link {
  min-width: 500px;
  margin-bottom: 32px;
}

.roomInfo {
  max-width: 450px;
}

.roomInfo p {
  color: var(--black);
}

.label {
  font-size: 0.9em;
  margin-bottom: -12px;
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
  min-width: 450px;
  border-radius: 8px;
  box-sizing: border-box;
}

ol {
  padding-left: 0;
  list-style-position: inside;
}

li.player {
  padding: 24px 0;
  border-bottom: 1px solid var(--black);
}

li.player:last-of-type {
  border-bottom: none;
}

.highlight {
  font-weight: bold;
}
</style>
