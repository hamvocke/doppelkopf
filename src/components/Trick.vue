<template>
  <div class="trick">
    <h2>Aktueller Stich</h2>
    <Card v-for='playedCard in cards' :card='playedCard.card' :key='playedCard.card.suit-playedCard.card.rank' />
    <div class="winner">
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
  border: 1px solid #999;
  padding: 12px;
  border-radius: 8px;
  display: inline-block;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
  background: #ccc;
}

</style>
