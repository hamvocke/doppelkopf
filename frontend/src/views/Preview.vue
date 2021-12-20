<!-- This view is intended for previewing in-development components only. -->

<template>
  <div id="root">
    <reservations :game="game" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Game } from "@/models/game";
import Reservations from "@/components/Reservations.vue";

@Component({ components: { Reservations } })
export default class Preview extends Vue {
  @Prop({ default: () => Game.singlePlayer() })
  game!: Game;
}
</script>

<style scoped>
#root {
  height: 100%;
}
</style>
