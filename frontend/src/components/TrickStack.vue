<template>
  <div class="trickStack">
    <div v-if="isHidden" class="placeholder">
      <Card :is-covered="true" :card="{}" />
    </div>
    <transition name="stack">
      <div v-if="!isHidden" class="cards">
        <Card :is-covered="true" :card="{}" />
      </div>
    </transition>
    <div class="trickCount">{{ $tc("trick", trickStack.tricks.length) }}</div>
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
@import "../assets/css/vars.css";

.placeholder {
  background-color: var(--white);
  opacity: 0.2;
  border-radius: 8px;
}

.placeholder .card {
  visibility: hidden;
}

.trickCount {
  margin-top: 12px;
}

.cards {
  display: flex;
  justify-content: center;
}

.stack-enter-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.stack-leave-active {
  transition: none;
}

.stack-enter,
.stack-leave-to {
  opacity: 0;
}

.stack-enter {
  transform: scale(2, 2);
}

@media screen and (max-width: 680px) {
  .trickStack {
    display: none;
  }
}
</style>
