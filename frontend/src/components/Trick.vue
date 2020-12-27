<template>
  <div class="trick">
    <div class="cards trick-card">
      <transition-group name="card" tag="span">
        <Card
          v-for="playedCard in playerPlayedCards"
          :key="playedCard.card"
          :card="playedCard.card"
          :player-name="playedCard.player.name"
          :position="playedCard.player.tablePosition"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "Trick",
  components: {
    Card
  },
  props: {
    currentTrick: {
      type: Object,
      default: null
    }
  },
  computed: {
    cards: function() {
      return this.currentTrick.cards();
    },
    playerPlayedCards: function() {
      return this.currentTrick.playerPlayedCards();
    }
  }
};
</script>

<style scoped>
.trick {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: stretch;
}

.cards > span {
  display: grid;
  grid-template-areas:
    "left top right"
    "left bottom right";
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 6px;
  row-gap: 64px;
  height: 100%;
}

.trick-card {
  height: 100%;
}
/*
following problems so far:
card class is only added to the trick when card is there, hence the layout is always in movement, due to flex moving correspondingly
- card containers have to be static, with min-height and min-width vals, matching the card-size.
either we create a static grid with empty cells checking 4x4 direction === card or we create "dummy" cards that don't show but still create the correct layout  

*/

.cards .card {
  margin: 6px;
}

.card-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 0.5s;
}

.card-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 0s;
}

.card-leave-to {
  opacity: 0;
}

.card-enter {
  opacity: 0;
  transform: scale(2, 2);
}
</style>
