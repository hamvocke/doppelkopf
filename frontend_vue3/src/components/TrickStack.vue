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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "./Card.vue";
import { TrickStack as TrickStackModel } from "@/models/trickStack";

@Component({
  components: { Card }
})
export default class TrickStack extends Vue {
  @Prop({ required: true })
  trickStack!: TrickStackModel;

  get isHidden() {
    return this.trickStack.tricks.length < 1;
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

.placeholder {
  background-color: var(--white);
  opacity: 0.2;
  border-radius: 8px;
  margin-bottom: 6px;
}

.placeholder .card {
  visibility: hidden;
}

.cards {
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
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
