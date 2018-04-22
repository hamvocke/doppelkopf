<template>
  <div class="trickStack" v-if='this.trickStack.tricks.length > 0'>
    <p class="trickCount">Stiche: {{ this.trickStack.tricks.length }}</p>
    <Card :is-covered='true' />
    <Card :is-covered='true' />
    <Card :is-covered='true' />
    <Card :is-covered='true' />
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
@import "assets/css/colors.css";

.trickStack {
  margin: 6px;
  padding: 6px;
  display: inline-block;
}

.card {
  margin-left: -60px;
}

</style>
