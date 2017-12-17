<template>
  <div class="card">
    <span class="suitTop" v-bind:class='classObject'>{{ card.suite }}</span>
    <span class="rank">{{ card.rank }}</span>
    <span class="suitBottom" v-bind:class='classObject'>{{ card.suite }}</span>
  </div>
</template>

<script>
import { suites } from '@/models/card'

export default {
  name: 'Card',
  props: ['card'],
  computed: {
    classObject: function () {
      return {
        'red': this.card.suite === suites.hearts || this.card.suite === suites.diamonds,
        'black': this.card.suite === suites.pikes || this.card.suite === suites.spades
      }
    }
  }
}
</script>

<style scoped>

.card {
  position: relative;
  border: 1px solid #ccc;
  padding: 8px;
  margin: 12px;
  border-radius: 12px;
  display: inline-block;
  height: 200px;
  width: 150px;
  box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.2);
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
  color: red;
}

.black {
  color: black;
}

</style>
