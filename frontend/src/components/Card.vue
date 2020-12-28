<template>
  <div class="card" :class="[tablePosition, zIndex]">
    <template v-if="card">
      <div class="card-inner" :class="cardClasses">
        <template v-if="isCovered">
          <div class="background"></div>
        </template>
        <template v-else>
          <div class="card-top" :class="colorClasses">
            <div class="rank">{{ $t(card.rank) }}</div>
            <div class="suit">{{ card.suit }}</div>
          </div>
          <span class="card-center" :class="colorClasses">
            {{ card.suit }}
          </span>
          <div class="card-bottom" :class="colorClasses">
            <div class="rank">{{ $t(card.rank) }}</div>
            <div class="suit">{{ card.suit }}</div>
          </div>
        </template>
      </div>
    </template>
    <div v-if="player" class="playerName">{{ player.name }}</div>
  </div>
</template>

<script>
import { suits } from "@/models/card";

export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true
    },
    player: {
      type: Object,
      required: false,
      default: undefined
    },
    isSelected: {
      type: Boolean,
      required: false
    },
    isCovered: {
      type: Boolean,
      required: false
    },
    isHighlighted: {
      type: Boolean,
      required: false
    },
    position: {
      type: String,
      required: false,
      default: "not-set"
    }
  },
  computed: {
    colorClasses: function() {
      return {
        red:
          this.card.suit === suits.hearts || this.card.suit === suits.diamonds,
        black: this.card.suit === suits.clubs || this.card.suit === suits.spades
      };
    },
    cardClasses: function() {
      return {
        selected: this.isSelected,
        highlighted: this.isHighlighted,
        left: this.position === "left",
        right: this.position === "right",
        top: this.position === "top",
        bottom: this.position === "bottom",
        covered: this.isCovered
      };
    },
    tablePosition: function() {
      return {
        "position-top": this.position === "top",
        "position-left": this.position === "left",
        "position-right": this.position === "right",
        "position-bottom": this.position === "bottom"
      };
    },
    zIndex: function() {
      return this.player
        ? {
            "first-card":
              this.player === this.player.game.currentRound.playerOrder.first(),
            "second-card":
              this.player ===
              this.player.game.currentRound.playerOrder.second(),
            "third-card":
              this.player === this.player.game.currentRound.playerOrder.third(),
            "fourth-card":
              this.player === this.player.game.currentRound.playerOrder.fourth()
          }
        : {};
    }
  },
  methods: {
    isCard: function() {
      return this.card ? true : false;
    }
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.card {
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-delay: 0s;
  display: inline-flex;
}

.position-top {
  grid-area: top;
  justify-content: center;
  align-items: end;
}

.position-left {
  grid-area: left;
  justify-content: end;
  align-items: center;
}

.position-right {
  grid-area: right;
  justify-content: start;
  align-items: center;
}

.position-bottom {
  grid-area: bottom;
  justify-content: center;
  align-items: start;
}

.position-top,
.position-bottom {
  min-width: 70px;
  min-height: 97px;
}

.card-inner {
  position: relative;
  top: 0px; /* necessary for css transition */
  height: 85px;
  width: 58px;
  color: var(--black);
  background: var(--white);
  padding: 6px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  user-select: none;
  font-weight: 900;
}

.top {
  transform: rotate(180deg);
}

.left {
  transform: rotate(90deg);
}

.right {
  transform: rotate(-90deg);
}

.selected {
  top: -10px;
  box-shadow: 0 20px 38px rgba(0, 0, 0, 0.25), 0 15px 12px rgba(0, 0, 0, 0.22);
  z-index: 200;
}

.first-card {
  z-index: 10;
}

.second-card {
  z-index: 20;
}

.third-card {
  z-index: 30;
}

.fourth-card {
  z-index: 40;
}

.card-top {
  position: absolute;
  font-size: 1.1em;
  left: 6px;
  top: 6px;
}

.suit {
  margin-top: -2px;
  font-size: 0.9em;
}

.card-bottom {
  position: absolute;
  font-size: 1.1em;
  right: 6px;
  bottom: 6px;
  transform: rotate(180deg);
}

.card-center {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  height: 100%;
  font-size: 2em;
}

.red {
  color: var(--red);
}

.black {
  color: var(--black);
}

.background {
  background-color: var(--red);
  height: 100%;
  width: 100%;
  display: inline-block;
  border-radius: 6px;
}

.highlighted {
}

.playerName {
  position: absolute;
  margin-top: -20px;
  opacity: 0;
  padding: 6px;
  background: var(--lightblue);
  color: var(--white);
  font-size: 0.9em;
  border-radius: 3px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.22);
  transition: opacity 0.15s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover .playerName,
.card:active .playerName {
  opacity: 1;
}

@media screen and (max-width: 680px) {
  .background {
    border-radius: 4px;
  }

  .position-top,
  .position-bottom {
    min-width: 32px;
    min-height: 44px;
  }
  .card-inner {
    height: 55px;
    width: 38px;
    border-radius: 4px;
    padding: 3px;
  }

  .trick-card .card-inner.bottom,
  .card-inner.top,
  .card-inner.left,
  .card-inner.right {
    height: 38px;
    width: 26px;
  }

  .selected {
    top: -6px;
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.25), 0 15px 12px rgba(0, 0, 0, 0.22);
    z-index: 200;
  }

  .card-top {
    left: 3px;
    top: 3px;
  }

  .card-bottom {
    display: none;
  }

  .card-top .rank {
    font-size: 0.9em;
    font-weight: bold;
  }

  .suit {
    display: none;
  }

  .card-center {
    font-size: 1.5em;
  }
}
</style>
