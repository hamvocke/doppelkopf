<template>
  <div class="hand">
    <div class="cards">
      <Card v-for='card in hand.cards' :card='card' :key='card.cardId' :isSelected='isSelected(card)' v-on:click.native='select(card)' />
    </div>
    <div class="info">
      <div class="party">
        {{ hand.isRe() ? "Re" : "Kontra" }}
      </div>
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
.info > div {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 1.2em;
  padding: 12px;
  display: inline-block;
}

</style>
