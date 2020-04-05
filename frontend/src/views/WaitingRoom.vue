<template>
  <div id="waitingRoom">
    <div class="roomInfo">
      <p>
        This is your game id. Send it to your friends so they can join the game:
      </p>
      <div class="copyLink">
        <span class="gameId">{{ waitingRoom.gameId }}</span>
        <button class="copy button button-secondary">Copy link</button>
      </div>
    </div>

    <div class="state">{{ waitingRoom.state }}</div>

    <div class="players">
      Waiting players:
      <div v-for="player in waitingRoom.players" :key="player.id">
        {{ player.name }}
      </div>
    </div>

    <button class="button start-game" tag="button" @click="startGame()">
      {{ $t("start-game") }}
    </button>
  </div>
</template>

<script>
import { WaitingRoom } from "@/models/waitingRoom";

export default {
  name: "WaitingRoom",
  data: function() {
    return {
      waitingRoom: new WaitingRoom()
    };
  },
  created() {
    this.waitingRoom.join("Karl Heinz");
  },
  methods: {
    startGame: function() {
      this.waitingRoom.startGame();
      this.$router.push("/play");
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

.players {
  padding: 12px;
  margin: 24px;
  background: var(--white);
  color: var(--black);
  display: block;
  min-width: 400px;
  border-radius: 8px;
}
</style>
