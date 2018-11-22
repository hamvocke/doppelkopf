<template>
  <div class="player">
    <div class="info">
      <div class="name">{{ player.name }}</div>
    </div>
    <div class="container">
      <Hand :hand="player.hand" :is-covered="isCovered" :is-selectable='isHandSelectable' :position='player.tablePosition' :playable-cards="playable()" v-on:play="play"/>
      <TrickStack :trickStack="player.trickStack"/>
    </div>
  </div>
</template>

<script>
import Hand from "./Hand";
import TrickStack from "./TrickStack";
import { playableCards } from "@/models/playableCardFinder";

export default {
  name: "Player",
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      isCovered: !this.player.isHuman,
      isHandSelectable: this.player.isHuman
    };
  },
  components: {
    Hand,
    TrickStack
  },
  methods: {
    play: function(card) {
      this.player.play(card);
    },
    playable: function() {
      return playableCards(
        this.player.hand.cards,
        this.player.game.currentTrick.baseCard()
      );
    }
  }
};
</script>

<style scoped>
.player {
  margin: 6px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.info {
  margin: 6px;
  text-align: center;
}

.left .container,
.right .container {
  flex-direction: column;
  align-items: center;
}

.name {
  font-weight: bold;
}

@media screen and (max-width: 680px) {
  .top {
    position: relative;
    top: -50px;
  }

  .left {
    position: relative;
    left: -60px;
  }

  .right {
    position: relative;
    right: -60px;
  }
}
</style>
