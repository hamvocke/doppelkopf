<template>
  <div class="hand">
    <Card v-for='card in hand.cards' :card='card' :key='card.cardId' :isSelected='isSelected(card)' v-on:click.native='select(card)' />
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
        this.$emit('play', card)
      } else {
        this.selectedCard = card
      }
    }
  }
}
</script>

<style scoped>
.party {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 1.2em;
  padding: 12px;
  display: inline-block;
}

</style>
