<template>
  <div id="app">
    <h1>Doppelkopf</h1>
    <Trick :currentTrick='game.currentTrick' />
    <Player v-for='player in game.players' :player='player' :key='player.name' />
  </div>
</template>

<script>
import Player from './components/Player'
import Trick from './components/Trick'
import { Game } from './models/game'

const gameData = new Game()

export default {
  name: 'app',
  data () {
    return {
      game: gameData
    }
  },
  components: {
    Player, Trick
  }
}
</script>

<style>
body {
  background: #ddd;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
