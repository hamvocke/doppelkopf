<template>
  <div class="trickStack" v-if='this.trickStack.tricks.length > 0'>
    <div class="cards">
      <Card :is-covered='true' :card='{}' />
    </div>
    <p class="trickCount">Stiche: {{ this.trickStack.tricks.length }}</p>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'TrickStack',
  components: {
    Card
  },
  props: {
    trickStack: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
@import "../assets/css/colors.css";

.trickStack {
  margin-top: 12px;
}

.trickCount {
  display: block;
}

.cards {
  display: flex;
  justify-content: center;
}

.card {
  margin-left: -40px;
}

.card:first-of-type {
  margin-left: 0;
}

</style>
