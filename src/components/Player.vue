<template>
  <div class="player">
    <div class="info">
      <div class="name">{{ player.name }}</div>
      <label><input type="checkbox" v-model="isCovered"> Hide Cards</label>
    </div>
    <div class="container">
      <Hand :hand="hand" :is-covered="isCovered" :position='position' :playable-cards="playable()" v-on:play="play"/>
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
      isCovered: !this.player.isHuman
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
  justify-content: space-between;
}

.info {
  text-align: center;
}

.name {
  font-weight: bold;
}

</style>
