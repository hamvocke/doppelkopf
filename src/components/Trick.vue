<template>
  <div class="trick">
    <div class="cards">
      <Card v-for='playedCard in cards' :card='playedCard.card' :key='playedCard.card.cardId' />
    </div>
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
  margin: 12px;
  border-radius: 8px;
  min-height: 90%;
  background: rgba(255, 255, 255, 0.3);
  justify-content: center;
}

.cards {
  display: flex;
  justify-content: center;
}

.cards .card {
  margin: 6px;
}

</style>
``
