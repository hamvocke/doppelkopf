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
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 8px;
  display: inline-block;
  height: 200px;
  width: 150px;
}

.red {
  color: red;
}

.black {
  color: black;
}

</style>
