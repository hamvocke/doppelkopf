<template>
  <div class="sample-trick">
    <Card v-for="card in cards" :key="card.cardId" :card="card" />
    <p>A simple trick with four cards</p>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { ten, jack, ace, king, suits } from "@/models/card";

export default {
  name: "SampleTrick",
  components: { Card },
  data() {
    return {
      cards: [
        jack.of(suits.spades),
        ten.of(suits.hearts),
        ace.of(suits.diamonds),
        king.of(suits.diamonds)
      ]
    };
  }
};
</script>

<style scoped>
@import "../../assets/css/vars.css";

.sample-trick > div {
  margin: 8px;
}

p {
  margin: 8px;
}
</style>
