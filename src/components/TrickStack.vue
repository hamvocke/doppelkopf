<template>
  <div class="trickStack">
    <Card v-for='card in cards' is-covered="true" :key='card.cardId' />
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
  },
  data: function () {
    return {
      cards: this.trickStack.cards()
    }
  }
}
</script>

<style scoped>

</style>
