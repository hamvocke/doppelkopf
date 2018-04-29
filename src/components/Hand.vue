<template>
  <div class="hand">
    <div class="cards" :class="position">
      <Card v-for='card in hand.cards' :card='card' :key='card.cardId' :is-selected='isSelected(card)' :is-covered='isCovered' :is-highlighted='highlight(card)' :position='position' v-on:click.native='select(card)' />
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
    position: {
      type: String,
      required: false
    },
    playableCards: {
      type: Array,
      required: true
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
    },
    highlight: function (card) {
      return this.playableCards.includes(card)
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

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 12px;
}

.top {
  flex-direction: row-reverse;
}

.top .card, .bottom .card {
  margin-left: -24px;
}

.top .card:last-child, .bottom .card:first-child {
  margin-left: 0;
}

.left .card, .right .card {
  margin-top: -48px;
}

.top .card {
  transform: rotate(180deg);
}

.left .card {
  transform: rotate(90deg);
}

.right .card {
  transform: rotate(-90deg);
}

.left .card:first-child, .right .card:last-child {
  margin-top: 0;
}

.bottom {
  flex-direction: row;
}

.left {
  flex-direction: column;
}

.right {
  flex-direction: column-reverse;
}

.info > div {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 1.2em;
  padding: 12px;
  display: inline-block;
}
</style>
