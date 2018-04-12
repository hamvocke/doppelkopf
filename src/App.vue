<template>
  <div id="app">
    <Notifications/>
    <Player :player='game.players[1]' class='left' />
    <Player :player='game.players[2]' class='top' />

    <div class="center">
      <Trick :currentTrick='game.currentTrick' v-on:nextTrick="finishTrick" v-on:nextMove="nextMove"/>
      <div class="currentPlayer">
        Waiting for: {{ game.waitingForPlayer().name }}
      </div>
    </div>


    <Player :player='game.players[3]' class='right'/>
    <Player :player='game.players[0]' class='bottom' />

  </div>
</template>

<script>
import Player from './components/Player'
import Notifications from './components/Notifications'
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
    Player, Trick, Notifications
  },
  methods: {
    nextMove: function () {
      this.game.nextMove()
    },
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
  background: #d3cce3;
  /* background: linear-gradient(to right, #00CDAC, #02AAB0); */
  background: linear-gradient(to left, #d3cce3, #e9e4f0);
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  display: grid;
  grid-template-columns: 25% auto 25%;
  grid-template-rows: 50px 15% auto 15%;
  grid-template-areas:
    "notifications notifications  notifications"
    "top top top"
    "left center right"
    "bottom bottom bottom";
}

.trick {
  grid-area: center;
}

.top {
  grid-area: top;
}

.right {
  grid-area: right;
}

.center {
  grid-area: center;
}

.bottom {
  grid-area: bottom;
}

.left {
  grid-area: left;
}
</style>
