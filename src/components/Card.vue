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
        'black': this.card.suit === suits.clubs || this.card.suit === suits.spades
      }
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  background: #fff;
  padding: 8px;
  margin: 12px;
  border-radius: 12px;
  display: inline-block;
  height: 180px;
  width: 120px;
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

.selected {
  top: -10px;
  box-shadow: 0 20px 38px rgba(0,0,0,0.25), 0 15px 12px rgba(0,0,0,0.22);
}

.suitTop {
  position: absolute;
  font-size: 1.7em;
  left: 8px;
  top: 8px;
}

.suitBottom {
  position: absolute;
  font-size: 1.7em;
  right: 8px;
  bottom: 8px;
}

.rank {
  font-size: 4em;
  line-height: 180px;
}

.red {
  color: #f25f5c;
}

.black {
  color: #50514f;
}

</style>
