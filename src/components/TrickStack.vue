<template>
  <div class="trickStack" :class="{ hidden: isHidden }">
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
  computed: {
    isHidden: function () { return this.trickStack.tricks.length < 1 }
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

.hidden {
  visibility: hidden;
}

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
