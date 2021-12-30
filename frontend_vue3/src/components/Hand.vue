<template>
  <div class="hand">
    <div class="cards" :class="position">
      <Card
        v-if="isEmpty"
        :is-covered="false"
        class="placeholder"
        :card="{}"
        :position="position"
      />
      <transition-group v-else name="card" tag="span">
        <Card
          v-for="card in hand.cards"
          :key="card.cardId"
          :card="card"
          :is-selected="card === selectedCard"
          :is-covered="isCovered"
          :is-highlighted="highlight(card)"
          :position="position"
          @click.native="select(card)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "./Card.vue";
import { Hand as HandModel } from "@/models/hand";

@Component({
  components: { Card }
})
export default class Hand extends Vue {
  @Prop({ required: true })
  hand!: HandModel;

  @Prop()
  isCovered!: boolean;

  @Prop()
  position!: string;

  @Prop({ required: true })
  playableCards!: Card[];

  @Prop()
  isSelectable!: boolean;

  selectedCard: Card | null = null;

  get isEmpty() {
    return this.hand.cards.length === 0;
  }

  select(card: Card) {
    if (!this.isSelectable) return;

    if (this.selectedCard === card) {
      this.$emit("play", card);
    } else {
      this.selectedCard = card;
    }
  }

  highlight(card: Card) {
    return this.playableCards.includes(card);
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

.cards > span {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.placeholder {
  background-color: var(--white);
  opacity: 0.2;
  border-radius: 8px;
}

.top > span {
  flex-direction: row-reverse;
}

.bottom > span {
  flex-direction: row;
}

.left > span {
  flex-direction: column;
}

.right > span {
  flex-direction: column-reverse;
}

.card-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.top .card-leave-to {
  opacity: 0;
  transform: translateY(120px) rotate(180deg);
}

.bottom .card-leave-to {
  opacity: 0;
  transform: translateY(-120px);
}

.left .card-leave-to {
  opacity: 0;
  transform: translateX(120px) rotate(90deg);
}

.right .card-leave-to {
  opacity: 0;
  transform: translateX(-120px) rotate(-90deg);
}

.top .card,
.bottom .card {
  margin-left: -24px;
}

.bottom .card:hover {
  cursor: pointer;
}

.top .card:last-child,
.bottom .card:first-child {
  margin-left: 0;
}

.left .card,
.right .card {
  margin-top: -64px;
}

.left .card:first-child,
.right .card:last-child {
  margin-top: 0;
}

@media screen and (max-width: 680px) {
  .top .card,
  .bottom .card {
    margin-left: -12px;
  }

  .top .card:last-child,
  .bottom .card:first-child {
    margin-left: 0;
  }

  .left .card,
  .right .card {
    margin-top: -28px;
  }

  .left .card:first-child,
  .right .card:last-child {
    margin-top: 0;
  }
}
</style>
