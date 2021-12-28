<template>
  <div class="all-trumps">
    <Card v-for="card in cards" :key="card.cardId" :card="card" />
    <p>All trumps ordered from highest to lowest</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Card from "@/components/Card.vue";
import { defaultTrumps } from "@/models/card";

@Component({ components: { Card } })
export default class AllTrumps extends Vue {
  cards = defaultTrumps;
}
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
