<template>
  <div class="player">
    <div class="info">
      <div class="name" :class="position">{{ player.name }}</div>
    </div>
    <div class="container">
      <Hand :hand="hand" :is-covered="isCovered" :is-selectable='isHandSelectable' :position='position' :playable-cards="playable()" v-on:play="play"/>
      <TrickStack :trickStack="player.trickStack"/>
    </div>
  </div>
</template>

<script>
import Hand from './Hand'
import TrickStack from './TrickStack'
import { playableCards } from '@/models/playableCardFinder'

export default {
  name: 'Player',
  props: {
    player: {
      type: Object,
      required: true
    },
    position: {
      type: String,
      required: false
    }
  },
  data: function () {
    return {
      hand: this.player.hand,
      isCovered: !this.player.isHuman,
      isHandSelectable: this.player.isHuman
    }
  },
  components: {
    Hand, TrickStack
  },
  methods: {
    play: function (card) {
      this.player.play(card)
    },
    playable: function () {
      return playableCards(this.player.hand.cards, this.player.game.currentTrick.baseCard())
    }
  }
}
</script>

<style scoped>
.player {
  padding: 6px;
  margin: 6px;
}

.container {
  display: flex;
  justify-content: center;
}

.info {
  text-align: center;
}

.left .container, .right .container {
  flex-direction: column;
}

.name {
  font-weight: bold;
}

</style>
