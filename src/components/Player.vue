<template>
  <div class="player">
    <div class="info">
      <div class="name">{{ player.name }}</div>
      <label><input type="checkbox" v-model="isCovered"> Hide Cards</label>
    </div>
    <Hand :hand="hand" :is-covered="isCovered" v-on:play="play"/>
    <TrickStack :trickStack="player.trickStack"/>
  </div>
</template>

<script>
import Hand from './Hand'
import TrickStack from './TrickStack'

export default {
  name: 'Player',
  props: {
    player: {
      type: Object,
      required: true
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
    }
  }
}
</script>

<style scoped>
.player {
  padding: 6px;
  margin: 6px;
}

.info {
  text-align: center;
  padding: 12px 0;
}

.name {
  font-weight: bold;
  line-height: 2em;
}

</style>
