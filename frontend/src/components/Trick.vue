<template>
  <div class="trick">
    <div class="cards">
      <transition-group name="card" tag="span">
        <Card
          v-for="playedCard in cards"
          :key="playedCard.id"
          :card="playedCard.card"
          :player="playedCard.player"
          :position="playedCard.player.tablePosition"
        />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "./Card.vue";
import { Trick as TrickModel } from "@/models/trick";

@Component({
  components: { Card }
})
export default class Trick extends Vue {
  @Prop()
  currentTrick?: TrickModel;

  get cards() {
    return this.currentTrick?.cards();
  }
}
</script>

<style scoped>
.trick {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards > span {
  display: grid;
  grid-template-areas:
    "top top top"
    "left empty right"
    "bottom bottom bottom";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.top {
  grid-area: top;
  justify-content: center;
  align-items: end;
}

.left {
  grid-area: left;
  justify-content: end;
  align-items: center;
}

.right {
  grid-area: right;
  justify-content: start;
  align-items: center;
}

.bottom {
  grid-area: bottom;
  justify-content: center;
  align-items: start;
}

.card-enter-active {
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 0.5s; /* needs to be in sync with the leave transition duration in Hand.vue */
}

.card-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 0s;
}

.card-leave-to {
  opacity: 0;
}

.card-enter {
  opacity: 0;
}
</style>
