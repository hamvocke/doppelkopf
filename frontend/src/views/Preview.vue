<!-- This view is intended for previewing in-development components only. -->

<template>
  <div id="root">
    <reservations :game="game" />
  </div>
</template>

<script>
import { Game } from "@/models/game";
import Reservations from "@/components/Reservations.vue";

export default {
  name: "Preview",
  components: {
    Reservations
  },
  props: {
    game: {
      type: Object,
      default: function() {
        return Game.singlePlayer();
      }
    }
  }
};
</script>

<style scoped>
#root {
  height: 100%;
}
</style>
