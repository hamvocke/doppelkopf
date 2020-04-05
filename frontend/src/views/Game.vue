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

import { Game, gameInstance } from "@/models/game";

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
        if (gameInstance === {}) {
          return Game.singlePlayer();
        }

        return gameInstance;
      }
    }
  }
};
</script>
