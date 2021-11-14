<template>
  <div id="game">
    <Notifications />
    <Table :game="game" />
    <OptionsMenu />
    <ShowLastTrick :trick="game.lastTrick" />
  </div>
</template>

<script>
import Notifications from "@/components/Notifications";
import Table from "@/components/Table";
import OptionsMenu from "@/components/OptionsMenu";
import ShowLastTrick from "@/components/ShowLastTrick";
import { Game } from "@/models/game";

export default {
  name: "Game",
  components: {
    Table,
    Notifications,
    OptionsMenu,
    ShowLastTrick
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
#game {
  height: 100%;
}
</style>
