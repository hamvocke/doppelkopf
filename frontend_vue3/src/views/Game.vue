<template>
  <div id="game">
    <Notifications />
    <Table :game="game" />
    <OptionsMenu />
    <ShowPreviousTrick :trick="game.previousTrick" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import Notifications from "@/components/Notifications.vue";
import Table from "@/components/Table.vue";
import OptionsMenu from "@/components/OptionsMenu.vue";
import ShowPreviousTrick from "@/components/ShowPreviousTrick.vue";
import { Game } from "@/models/game";

const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    default: () => Game.singlePlayer()
  }
});
</script>

<style scoped>
#game {
  height: 100%;
}
</style>
