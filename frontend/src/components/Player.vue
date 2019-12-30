<template>
  <div class="player">
    <div class="info">
      <div class="name title-font">{{ player.name }}</div>
      <div v-if="player.isHuman" class="party">
        {{ player.hand.isRe() ? "Re" : "Kontra" }}
      </div>
    </div>
    <div class="container">
      <Hand
        :hand="player.hand"
        :is-covered="isCovered"
        :is-selectable="isHandSelectable"
        :position="player.tablePosition"
        :playable-cards="playable()"
        @play="play"
      />
      <TrickStack :trick-stack="player.trickStack" />
    </div>
  </div>
</template>

<script>
import Hand from "./Hand";
import TrickStack from "./TrickStack";
import { playableCards } from "@/models/playableCardFinder";

export default {
  name: "Player",
  components: {
    Hand,
    TrickStack
  },
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
@import "../assets/css/vars.css";
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
  background: var(--lightblue);
  color: var(--white);
  border-radius: 4px;
  font-size: 1em;
  padding: 6px;
  margin: 6px;
  display: inline-block;
}

.left .container,
.right .container {
  flex-direction: column;
  align-items: center;
}

.name {
  font-size: 1.2em;
}
</style>
