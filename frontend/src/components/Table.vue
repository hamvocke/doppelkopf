<template>
  <div class="table">
    <Player :player="game.players[1]" class="left" />
    <Player :player="game.players[2]" class="top" />

    <div class="center">
      <Trick :trick="game.currentTrick" />
    </div>

    <Controls
      :game="game"
      @nextTrick="finishTrick"
      @nextMove="nextMove"
      @finishRound="finishRound"
    />

    <Player :player="game.players[3]" class="right" />
    <Player :player="game.players[0]" class="bottom" />

    <Scorecard
      v-if="game.currentRound.isFinished()"
      :scorecard="game.scorecard"
      :players="game.players"
      :current-score="game.currentRound.score"
      @nextRound="nextRound"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Player from "./Player.vue";
import Trick from "./Trick.vue";
import Controls from "./Controls.vue";
import Scorecard from "./Scorecard.vue";
import { Game } from "@/models/game";

@Component({
  components: { Player, Trick, Controls, Scorecard }
})
export default class Table extends Vue {
  @Prop({ required: true })
  game!: Game;

  async nextMove() {
    await this.game.currentRound.nextMove();
  }

  async finishTrick() {
    await this.game.currentRound.finishTrick();
  }

  finishRound() {
    this.game.currentRound.finishRound();
  }

  nextRound() {
    this.game.nextRound();
  }
}
</script>

<style scoped>
.table {
  display: grid;
  grid-template-areas:
    "top top top"
    "left center right"
    "left bottom right"
    "controls controls controls";
  grid-template-rows: auto 1fr auto 80px;
  grid-template-columns: minmax(140px, auto) 1fr minmax(140px, auto);
  overflow: auto;
  height: 100%;
  margin: auto;
}

.top {
  grid-area: top;
}

.right {
  grid-area: right;
}

.center {
  grid-area: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom {
  grid-area: bottom;
}

.left {
  grid-area: left;
}

@media screen and (max-width: 680px) {
  .table {
    grid-template-areas:
      "top top top"
      "left center right"
      "bottom bottom bottom"
      "controls controls controls";

    grid-template-columns: minmax(120px, auto) 1fr minmax(120px, auto);
  }
}

@media screen and (min-width: 1440px) {
  .table {
    max-width: 1200px;
  }
}
</style>
