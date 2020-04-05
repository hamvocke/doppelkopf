<template>
  <div id="waitingRoom">
    Waiting Room. Current state: {{ waitingRoom.state }}

    <div v-for="player in waitingRoom.players" :key="player.id">
      {{ player.name }}
    </div>

    <router-link
      to="/play"
      class="button start-game"
      tag="button"
      @click="startGame()"
    >
      {{ $t("start-game") }}
    </router-link>
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
    }
  }
};
</script>

<style>

</style>
