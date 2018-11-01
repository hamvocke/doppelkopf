<template>
  <div id="app">
    <Notifications/>
    <WelcomeScreen v-if='!game.isStarted()' :game='game' />
    <Table :game='game' v-else />
  </div>
</template>

<script>
import Notifications from "./components/Notifications";
import WelcomeScreen from "./components/WelcomeScreen";
import Table from "./components/Table";

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
    WelcomeScreen
  }
};
</script>

<style>
@import "./assets/css/colors.css";
@import "./assets/css/normalize.css";

body {
  background: var(--background);
  /* background: linear-gradient(to right, #00CDAC, #02AAB0); */
  background: radial-gradient(#e9e4f0, #d3cce3);
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}

p {
  text-align: left;
  line-height: 1.4em;
  color: var(--black);
}

a {
  color: var(--red);
}

a:hover,
a:active,
a:focus {
  color: color(var(--red) tint(20%));
}

a:visited {
  color: color(var(--red) shade(20%));
}
</style>
