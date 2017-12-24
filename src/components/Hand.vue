<template>
  <div class="hand">
    <Card v-for='card in hand.cards' :card='card' :key='card.suit-card.rank' />
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Hand',
  props: ['hand'],
  data: function () {
    return {
      sortedHhand: this.hand.sort()
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>


</style>
