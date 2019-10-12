<template>
  <div class="hand">
    <div class="cards" :class="position">
      <transition-group name="card" tag="span">
        <Card v-for='card in hand.cards' :card='card' :key='card.cardId' :is-selected='isSelected(card)' :is-covered='isCovered' :is-highlighted='highlight(card)' :position='position' v-on:click.native='select(card)' />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "Hand",
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
    },
    isSelectable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    Card
  },
  data: function() {
    return {
      selectedCard: {}
    };
  },
  methods: {
    isSelected: function(card) {
      return card === this.selectedCard;
    },
    select: function(card) {
      if (!this.isSelectable) return;

      if (this.selectedCard === card) {
        this.$emit("play", card);
      } else {
        this.selectedCard = card;
      }
    },
    highlight: function(card) {
      return this.playableCards.includes(card);
    }
  }
};
</script>

<style scoped>
.cards > span {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.top > span {
  flex-direction: row-reverse;
}

.bottom > span {
  flex-direction: row;
}

.left > span {
  flex-direction: column;
}

.right > span {
  flex-direction: column-reverse;
}

.top .cards,
.bottom .cards {
  margin-right: 12px;
}

.card-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.top .card-leave-to {
  opacity: 0;
  transform: translateY(120px) rotate(180deg);
}

.bottom .card-leave-to {
  opacity: 0;
  transform: translateY(-120px);
}

.left .card-leave-to {
  opacity: 0;
  transform: translateX(120px) rotate(90deg);
}

.right .card-leave-to {
  opacity: 0;
  transform: translateX(-120px) rotate(-90deg);
}

.top .card,
.bottom .card {
  margin-left: -24px;
}

.top .card:last-child,
.bottom .card:first-child {
  margin-left: 0;
}

.left .card,
.right .card {
  margin-top: -60px;
}

.left .card:first-child,
.right .card:last-child {
  margin-top: 0;
}

@media screen and (max-width: 680px) {
  .top .card,
  .bottom .card {
    margin-left: -12px;
  }

  .top .card:last-child,
  .bottom .card:first-child {
    margin-left: 0;
  }

  .left .card,
  .right .card {
    margin-top: -24px;
  }

  .left .card:first-child,
  .right .card:last-child {
    margin-top: 0;
  }
}
</style>
