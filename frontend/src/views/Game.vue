<template>
  <div id="game">
    <Notifications />
    <Table :game="game" />
    <OptionsMenu />
  </div>
</template>

<script>
import Notifications from "@/components/Notifications";
import Table from "@/components/Table";
import OptionsMenu from "@/components/OptionsMenu";

import { Game } from "@/models/game";

export default {
  name: "Game",
  components: {
    Table,
    Notifications,
    OptionsMenu
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
