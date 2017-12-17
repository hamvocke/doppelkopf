<template>
  <div class="card" v-bind:class='classObject'>
    {{ card.rank }} {{ card.suite }}
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
  border: 1px solid #ccc;
  padding: 8px;
  margin: 4px;
  border-radius: 12px;
  display: inline-block;
  height: 200px;
  line-height: 200px;
  width: 150px;
  box-shadow: 1px 3px 2px rgba(10, 10, 10, 0.1);
  font-size: 2em;
  background: linear-gradient(to bottom, #fefefe, #eeeeee);
}

.red {
  color: red;
}

.black {
  color: black;
}

</style>
