<template>
  <div class="hand">
    <Card v-for='card in hand.cards' :card='card' :key='card.suit-card.rank' :isSelected='isSelected(card)' v-on:click.native='select(card)' />
    <div class="party">
      {{ hand.isRe() ? "Re" : "Kontra" }}
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Hand',
  props: ['hand'],
  components: {
    Card
  },
  data: function () {
    return {
      selectedCard: {}
    }
  },
  methods: {
    isSelected: function (card) {
      return card === this.selectedCard
    },
    select: function (card) {
      if (this.selectedCard === card) {
        this.$emit('play')
      } else {
        this.selectedCard = card
      }
    }
  }
}
</script>

<style scoped>
.party {
  border: 1px solid #aaa;
  background: #eee;
  color: #333;
  border-radius: 4px;
  padding: 8px;
  display: inline-block;
}

</style>
