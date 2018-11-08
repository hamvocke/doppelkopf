<template>
  <div class="table">
    <Player :player='game.players[1]' position='left' class='left' />
    <Player :player='game.players[2]' position='top' class='top' />

    <div class="center">
      <Trick :currentTrick='game.currentTrick'/>
    </div>

    <Controls :game='game'  v-on:nextTrick="finishTrick" v-on:nextMove="nextMove" v-on:finishRound="finishRound"/>

    <Player :player='game.players[3]' position='right' class='right'/>
    <Player :player='game.players[0]' position='bottom' class='bottom' />

    <Scorecard :scorecard='game.scorecard' :players='game.players' v-if='game.currentRound.isFinished()' />
  </div>
</template>

<script>
import Player from "./Player";
import Trick from "./Trick";
import Controls from "./Controls";
import Scorecard from "./Scorecard";

export default {
  name: "Table",
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  components: {
    Player,
    Trick,
    Controls,
    Scorecard
  },
  methods: {
    nextMove: function() {
      this.game.currentRound.nextMove();
    },
    finishTrick: function() {
      this.game.currentRound.finishTrick();
    },
    finishRound: function() {
      this.game.currentRound.finishRound();
    }
  }
};
</script>

<style scoped>
.table {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: auto 300px 120px auto;
  grid-template-areas:
    "top top top"
    "left center right"
    "left controls right"
    "bottom bottom bottom";
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
