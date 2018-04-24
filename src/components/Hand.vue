<template>
  <div class="hand">
    <div class="cards">
      <Card v-for='card in hand.cards' :card='card' :key='card.cardId' :is-selected='isSelected(card)' :is-covered='isCovered' :side='side' v-on:click.native='select(card)' />
    </div>
    <div class="info" v-if='!isCovered'>
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
  props: {
    hand: {
      type: Object,
      required: true
    },
    isCovered: {
      type: Boolean,
      required: false
    },
    side: {
      type: Boolean,
      required: false
    }
  },
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
.hand {
  margin: auto;
  text-align: center;
  display: block;
}

.info > div {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 1.2em;
  padding: 12px;
  display: inline-block;
}
</style>
