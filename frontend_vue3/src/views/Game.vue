<template>
  <div id="game">
    <Notifications />
    <Table :game="game" />
    <OptionsMenu />
    <ShowPreviousTrick :trick="game.previousTrick" />
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive } from "vue";
import Notifications from "@/components/Notifications.vue";
import Table from "@/components/Table.vue";
import OptionsMenu from "@/components/OptionsMenu.vue";
import ShowPreviousTrick from "@/components/ShowPreviousTrick.vue";
import { Game } from "@/models/game";

const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    default: () => Game.singlePlayer(),
  },
});

// This one's essential. With vue 3 we need to explicitly tell vue which part of our
// data is supposed to be reactive. Since we're always passing the same game instance (or parts thereof)
// to all of our components, it's good enough to make the top-level `game` object reactive once.
const game = reactive(props.game);
</script>

<style scoped>
#game {
  height: 100%;
}
</style>
