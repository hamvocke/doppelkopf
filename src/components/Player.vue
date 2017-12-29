<template>
  <div class="player">
    <h2 class="name">{{ player.name }}</h2>
    <Hand :hand='player.hand' v-on:play="play"/>
  </div>
</template>

<script>
import Hand from './Hand'

export default {
  name: 'Player',
  props: ['player'],
  data: function () {
    return {}
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
