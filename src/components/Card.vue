<template>
  <div class="card" v-bind:class="{ selected: isSelected, highlighted: isHighlighted }">
    <template v-if='isCovered'>
      <div class="background"></div>
    </template>
    <template v-else>
      <span class="suitTop" v-bind:class='classObject'>{{ card.suit }}</span>
      <span class="rank">{{ card.rank }}</span>
      <span class="suitBottom" v-bind:class='classObject'>{{ card.suit }}</span>
    </template>
  </div>
</template>

<script>
import { suits } from '@/models/card'

export default {
  name: 'Card',
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
    }
  },
  computed: {
    classObject: function () {
      return {
        'red': this.card.suit === suits.hearts || this.card.suit === suits.diamonds,
        'black': this.card.suit === suits.clubs || this.card.suit === suits.spades
      }
    }
  }
}
</script>

<style scoped>
@import "assets/css/colors.css";

.card {
  position: relative;
  background: #fff;
  padding: 6px;
  margin: 0 6px 18px -32px;
  border-radius: 12px;
  display: inline-block;
  height: 90px;
  width: 60px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  top: 0px;
  transition: all 0.25s cubic-bezier(.25,.8,.25,1);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.card:first-of-type {
  margin-left: 0;
}

.selected {
  top: -10px;
  box-shadow: 0 20px 38px rgba(0,0,0,0.25), 0 15px 12px rgba(0,0,0,0.22);
  z-index: 9999;
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
  line-height: 90px;
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

</style>
