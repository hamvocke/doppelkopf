<template>
  <div class="player">
    <div class="info">
      <div class="name">{{ player.name }}</div>
      <div class="party" v-if="player.isHuman">
        {{ player.hand.isRe() ? "Re" : "Kontra" }}
      </div>
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
@import "../assets/css/colors.css";
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

.party {
  background: color(var(--white) a(20%));
  color: var(--white);
  border-radius: 4px;
  font-size: 1em;
  padding: 8px;
  margin: 8px;
  display: inline-block;
}

.left .container,
.right .container {
  flex-direction: column;
  align-items: center;
}

.name {
  font-weight: bold;
}
</style>
