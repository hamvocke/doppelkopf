<template>
  <div id="app">
    <h1>Doppelkopf</h1>
    <Hand :hand='game.players[0].hand'/>
  </div>
</template>

<script>
import Hand from './components/Hand'
import Game from './models/game'

const gameData = new Game()

export default {
  name: 'app',
  data () {
    return {
      game: gameData
    }
  },
  components: {
    Hand
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
