<template>
  <div class="trickStack">
    <div v-if="isHidden" class="placeholder">
      <Card :is-covered="true" :card="{}" />
    </div>
    <div v-else class="cards">
      <Card :is-covered="true" :card="{}" />
    </div>
    <p class="trickCount">{{ $tc("trick", this.trickStack.tricks.length) }}</p>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "TrickStack",
  components: {
    Card
  },
  props: {
    trickStack: {
      type: Object,
      required: true
    }
  },
  computed: {
    isHidden: function() {
      return this.trickStack.tricks.length < 1;
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
