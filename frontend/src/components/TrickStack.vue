<template>
  <div class="trickStack">
    <div class="placeholder" v-if="isHidden">
      <Card :is-covered='true' :card='{}' />
    </div>
    <div class="cards" v-else>
      <Card :is-covered='true' :card='{}' />
    </div>
    <p class="trickCount">Stiche: {{ this.trickStack.tricks.length }}</p>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "TrickStack",
  components: {
    Card
  },
  computed: {
    isHidden: function() {
      return this.trickStack.tricks.length < 1;
    }
  },
  props: {
    trickStack: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
@import "../assets/css/colors.css";

.placeholder {
  background-color: var(--white);
  opacity: 0.2;
  border-radius: 8px;
}

.placeholder .card {
  visibility: hidden;
}

.trickCount {
  display: block;
}

.cards {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 680px) {
  .trickStack {
    display: none;
  }
}
</style>
