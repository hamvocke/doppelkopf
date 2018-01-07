<template>
  <div class="card" v-bind:class="{ selected: isSelected}">
    <span class="suitTop" v-bind:class='classObject'>{{ card.suit }}</span>
    <span class="rank">{{ card.rank }}</span>
    <span class="suitBottom" v-bind:class='classObject'>{{ card.suit }}</span>
  </div>
</template>

<script>
import { suits } from '@/models/card'

export default {
  name: 'Card',
  props: ['card', 'isSelected'],
  computed: {
    classObject: function () {
      return {
        'red': this.card.suit === suits.hearts || this.card.suit === suits.diamonds,
        'black': this.card.suit === suits.pikes || this.card.suit === suits.spades
      }
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  border: 1px solid #ccc;
  background: #fff;
  padding: 8px;
  margin: 12px;
  border-radius: 12px;
  display: inline-block;
  height: 180px;
  width: 120px;
  box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.2);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.selected {
  box-shadow: 1px 13px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  top: -10px;
}

.suitTop {
  position: absolute;
  font-size: 1.5em;
  left: 8px;
  top: 8px;
}

.suitBottom {
  position: absolute;
  font-size: 1.5em;
  right: 8px;
  bottom: 8px;
}

.rank {
  font-size: 4em;
  line-height: 200px;
}

.red {
  color: #f25f5c;
}

.black {
  color: #50514f;
}

</style>
