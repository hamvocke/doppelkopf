<template>
  <div class="trick">
    <h2>Aktueller Stich</h2>
    <Card v-for='playedCard in cards' :card='playedCard.card' :key='playedCard.card.suit-playedCard.card.rank' />
    <div class="winner" v-if='winner'>
      Stich geht an: {{ winner }}
    </div>
    <div class="next" v-if='currentTrick.isFinished()'>
      Next >>
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
  background: rgba(255, 255, 255, 0.3);
}

.next {
  padding: 12px;
  margin: 12px;
  border: 1px solid #000;
  color: #000;
  border-radius: 4px;
  display: inline-block;
}

</style>
