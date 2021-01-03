<template>
  <div class="trick">
    <div class="cards">
      <transition-group name="card" tag="span">
        <Card
          v-for="playedCard in cards"
          :key="playedCard.id"
          :card="playedCard.card"
          :player="playedCard.player"
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards > span {
  display: grid;
  grid-template-areas:
    "top top top"
    "left empty right"
    "bottom bottom bottom";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.top {
  grid-area: top;
  justify-content: center;
  align-items: end;
}

.left {
  grid-area: left;
  justify-content: end;
  align-items: center;
}

.right {
  grid-area: right;
  justify-content: start;
  align-items: center;
}

.bottom {
  grid-area: bottom;
  justify-content: center;
  align-items: start;
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

.card-enter .top,
.card-enter-to .top {
  transform: rotate(180deg);
}

.card-enter .left,
.card-enter-to .left {
  transform: rotate(90deg);
}

.card-enter .right,
.card-enter-to .right {
  transform: rotate(-90deg);
}
</style>
