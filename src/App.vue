<template>
  <div id="app">
    <Notifications/>
    <Table :game='game' />
    <Controls :game='game'  v-on:nextTrick="finishTrick" v-on:nextMove="nextMove" v-on:finishRound="finishRound"/>
  </div>
</template>

<script>
import Notifications from './components/Notifications'
import Table from './components/Table'
import Controls from './components/Controls'
import { Game } from './models/game'

export default {
  name: 'app',
  props: {
    game: {
      type: Object,
      default: function () {
        return new Game()
      }
    }
  },
  components: {
    Table, Notifications, Controls
  },
  methods: {
    nextMove: function () {
      this.game.currentRound.nextMove()
    },
    finishTrick: function () {
      this.game.currentRound.finishTrick()
    },
    finishRound: function () {
      this.game.currentRound.finishRound()
    }
  }
}
</script>

<style>
@import "./assets/css/colors.css";

body {
  padding: 0;
  margin: 0;
  background: var(--background);
  /* background: linear-gradient(to right, #00CDAC, #02AAB0); */
  background: radial-gradient(#e9e4f0, #d3cce3);
}

*, *:before, *:after {
  box-sizing: border-box;
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
</style>
