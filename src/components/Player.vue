<template>
  <div class="player">
    <h2 class="name">{{ player.name }}</h2>
    <Hand :hand='player.hand' />
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
  }
}
</script>

<style scoped>

</style>
