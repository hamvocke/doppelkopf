<template>
  <div class="trick">
    <h2>Aktueller Stich</h2>
    <Card v-for='playedCard in cards' :card='playedCard.card' :key='playedCard.card.suit-playedCard.card.rank' />
    <div class="winner" v-if='winner'>
      Stich geht an: {{ winner }}
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Trick',
  props: ['currentTrick'],
  computed: {
    cards: function () {
      return this.currentTrick.cards()
    },
    winner: function () {
      return this.currentTrick.winner()
    }
  },
  components: {
    Card
  }
}
</script>

<style scoped>

.trick {
  padding: 12px;
  border-radius: 8px;
  display: inline-block;
  min-height: 90%;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
}

</style>
``
