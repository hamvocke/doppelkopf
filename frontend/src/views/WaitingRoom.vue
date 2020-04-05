<template>
  <div id="waitingRoom">
    Waiting Room. Current state: {{ waitingRoom.state }}

    Waiting players:
    <div class="players">
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
