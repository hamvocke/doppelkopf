<template>
  <div id="game">
    <Notifications />
    <Table :game="game" />
    <OptionsMenu />
    <ShowPreviousTrick :trick="game.previousTrick" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Notifications from "@/components/Notifications.vue";
import Table from "@/components/Table.vue";
import OptionsMenu from "@/components/OptionsMenu.vue";
import ShowPreviousTrick from "@/components/ShowPreviousTrick.vue";
import { Game } from "@/models/game";

@Component({
  components: {
    Table,
    Notifications,
    OptionsMenu,
    ShowPreviousTrick
  }
})
export default class GameView extends Vue {
  @Prop({ default: () => Game.singlePlayer() })
  game!: Game;
}
</script>

<style scoped>
#game {
  height: 100%;
}
</style>
