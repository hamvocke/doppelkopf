<template>
  <div class="card">
    <div class="card-inner" :class="cardClasses">
      <template v-if="isCovered">
        <div class="background"></div>
      </template>
      <template v-else>
        <span class="suitTop" :class="colorClasses">{{ card.suit }}</span>
        <span class="rank">{{ card.rank }}</span>
        <span class="suitBottom" :class="colorClasses">{{ card.suit }}</span>
      </template>
    </div>
    <div v-if="playerName" class="playerName">{{ playerName }}</div>
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
    },
    playerName: {
      type: String,
      required: false,
      default: null
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
    }
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.card-inner {
  position: relative;
  top: 0px; /* necessary for css transition */
  height: 80px;
  width: 56px;
  color: var(--black);
  background: var(--white);
  padding: 6px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: top 0.25s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  user-select: none;
}

.card:not(.covered):hover {
  cursor: pointer;
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

.suitTop {
  position: absolute;
  font-size: 1.2em;
  left: 8px;
  top: 8px;
}

.suitBottom {
  position: absolute;
  font-size: 1.2em;
  right: 8px;
  bottom: 8px;
}

.rank {
  font-size: 2em;
  line-height: 80px;
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
  .card-inner {
    height: 58px;
    width: 38px;
    border-radius: 8px;
    padding: 3px;
  }

  .card-inner.top,
  .card-inner.left,
  .card-inner.right {
    height: 42px;
    width: 28px;
  }

  .selected {
    top: -6px;
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.25), 0 15px 12px rgba(0, 0, 0, 0.22);
    z-index: 200;
  }

  .rank {
    line-height: 55px;
    font-size: 1.3em;
  }

  .suitTop {
    font-size: 0.8em;
    left: 4px;
    top: 4px;
  }

  .suitBottom {
    font-size: 0.8em;
    right: 4px;
    bottom: 4px;
  }
}
</style>
