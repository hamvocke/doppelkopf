<template>
  <div id="game">
    <Notifications />
    <Table :game="game" />
    <OptionsMenu />
    <ShowPreviousTrick :trick="game.previousTrick" />
  </div>
</template>

<script>
import Notifications from "@/components/Notifications";
import Table from "@/components/Table";
import OptionsMenu from "@/components/OptionsMenu";
import ShowPreviousTrick from "@/components/ShowPreviousTrick";
import { Game } from "@/models/game";

export default {
  name: "Game",
  components: {
    Table,
    Notifications,
    OptionsMenu,
    ShowPreviousTrick
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
