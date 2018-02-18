<template>
  <div id="app">
    <Notifications/>
    <h1>Doppelkopf</h1>
    <Trick :currentTrick='currentTrick' v-on:nextTrick="finishTrick"/>
    <Player v-for='player in game.players' :player='player' :key='player.name' />
  </div>
</template>

<script>
import Player from './components/Player'
import Notifications from './components/Notifications'
import Trick from './components/Trick'
import { Game } from './models/game'
import { trickRegistry } from './models/trickRegistry'

const gameData = new Game()

export default {
  name: 'app',
  data () {
    return {
      game: gameData,
      currentTrick: trickRegistry.current()
    }
  },
  components: {
    Player, Trick, Notifications
  },
  methods: {
    finishTrick: function () {
      this.game.finishTrick()
    }
  }
}
</script>

<style>
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  /*background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);*/
  /*background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);*/
  /*background-image: linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);*/
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
