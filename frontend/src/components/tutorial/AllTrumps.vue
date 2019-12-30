<template>
  <div class="all-trumps">
    <Card v-for="card in cards" :key="card.cardId" :card="card" />
    <p>All trumps ordered from highest to lowest</p>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { trumps } from "@/models/card";

export default {
  name: "AllTrumps",
  components: { Card },
  data() {
    return {
      cards: trumps
    };
  }
};
</script>

<style scoped>
@import "../../assets/css/vars.css";

.all-trumps > div {
  margin: 8px;
}

p {
  margin: 8px;
}
</style>
