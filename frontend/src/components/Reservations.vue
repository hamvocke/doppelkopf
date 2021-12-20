<template>
  <modal>Reservations</modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Game } from "@/models/game";
import Modal from "@/components/Modal.vue";

@Component({ components: { Modal } })
export default class Reservations extends Vue {
  @Prop({ required: true })
  game!: Game;
}
</script>

<style scoped>
@import "../assets/css/vars.css";
</style>
