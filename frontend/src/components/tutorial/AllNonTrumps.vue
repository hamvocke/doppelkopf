<template>
  <div class="all-non-trumps">
    <Card v-for="card in cards" :key="card.cardId" :card="card" />
    <p>All non-trumps</p>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { ace, king, ten, suits } from "@/models/card";

export default {
  name: "AllNonTrumps",
  components: { Card },
  data() {
    return {
      cards: [
        ace.of(suits.clubs),
        ten.of(suits.clubs),
        king.of(suits.clubs),
        ace.of(suits.spades),
        ten.of(suits.spades),
        king.of(suits.spades),
        ace.of(suits.hearts),
        king.of(suits.hearts)
      ]
    };
  }
};
</script>

<style scoped>
@import "../../assets/css/vars.css";

.all-non-trumps > div {
  margin: 8px;
}

p {
  margin: 8px;
}
</style>
