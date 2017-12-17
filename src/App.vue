<template>
  <div id="app">
    <h1>Doppelkopf</h1>
    <div class="hand">
      <Card v-for='card in cards' :card='card' :key='card.suite-card.rank' />
    </div>
  </div>
</template>

<script>
import Card from './components/Card'
import Game from './models/game'

const gameData = new Game()
gameData.players[0].hand.sort()
const cards = gameData.players[0].hand.cards

export default {
  name: 'app',
  data () {
    return {
      game: gameData,
      cards: cards
    }
  },
  components: {
    Card
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
