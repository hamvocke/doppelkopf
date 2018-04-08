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
