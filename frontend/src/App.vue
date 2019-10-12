<template>
  <div id="app">
    <Notifications/>
    <WelcomeScreen v-if='!game.isStarted()' :game='game' />
    <Table :game='game' v-else />
    <LanguagePicker />
  </div>
</template>

<script>
import Notifications from "./components/Notifications";
import WelcomeScreen from "./components/WelcomeScreen";
import Table from "./components/Table";
import LanguagePicker from "./components/LanguagePicker";

import { Game } from "./models/game";

export default {
  name: "app",
  props: {
    game: {
      type: Object,
      default: function() {
        return new Game();
      }
    }
  },
  components: {
    Table,
    Notifications,
    WelcomeScreen,
    LanguagePicker
  }
};
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
