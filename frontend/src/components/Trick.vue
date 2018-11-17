<template>
  <div class="trick">
    <div class="cards">
      <transition-group name="card" tag="span">
        <Card v-for='playedCard in cards' :card='playedCard.card' :key='playedCard.card.cardId' />
      </transition-group>
    </div>
    <div class="winner" v-if='winner'>
      Trick goes to: {{ winner }}
    </div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "Trick",
  props: ["currentTrick"],
  computed: {
    cards: function() {
      return this.currentTrick.cards();
    },
    winner: function() {
      return this.currentTrick.winner();
    }
  },
  components: {
    Card
  }
};
</script>

<style scoped>
.trick {
  min-height: 180px;
  min-width: 180px;
  justify-content: center;
  align-items: stretch;
}

.winner {
  padding: 12px;
}

.cards > span {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.cards .card {
  margin: 6px;
}

.card-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 0.5s;
}

.card-leave-active,
.card-leave {
  transition-delay: 0s;
  transition: none;
}

.card-enter {
  opacity: 0;
  transform: scale(2, 2);
}
</style>
