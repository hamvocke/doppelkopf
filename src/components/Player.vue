<template>
  <div class="player">
    <h2 class="name">{{ player.name }}</h2>
    <Hand :hand='hand' :is-covered='isCovered' v-on:play="play"/>
    <label><input type="checkbox" v-model="isCovered"> Hide Cards</label>
  </div>
</template>

<script>
import Hand from './Hand'

export default {
  name: 'Player',
  props: {
    player: {
      type: Object,
      required: true
    },
    isCovered: {
      type: Boolean,
      required: false
    }
  },
  data: function () {
    return {
      hand: this.player.hand
    }
  },
  components: {
    Hand
  },
  methods: {
    play: function (card) {
      this.player.play(card)
    }
  }
}
</script>

<style scoped>

</style>
