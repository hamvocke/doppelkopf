<template>
  <div class="trickStack">
    <Card v-for='card in this.trickStack.cards()' is-covered='true' :key='card.cardId' :card='card' />
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'TrickStack',
  components: {
    Card
  },
  props: {
    trickStack: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
