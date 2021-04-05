<template>
  <div class="controls">
    <button
      v-if="
        game.currentTrick.isFinished() && !game.currentRound.noMoreCardsLeft()
      "
      class="button next"
      @click="triggerNextTrick()"
    >
      {{ $t("next-trick") }}
    </button>
    <button
      v-if="
        game.currentRound.noMoreCardsLeft() && !game.currentRound.isFinished()
      "
      class="button finish"
      @click="triggerFinish()"
    >
      {{ $t("finish-round") }}
    </button>

    <AnnouncementsButton v-if="enableAnnouncements" :player="game.players[0]" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AnnouncementsButton from "@/components/AnnouncementsButton.vue";
import { Features } from "@/models/features";
import { Game } from "@/models/game";

@Component({
  components: { AnnouncementsButton }
})
export default class Controls extends Vue {
  @Prop({ required: true })
  game!: Game;

  enableAnnouncements = false;

  created() {
    this.enableAnnouncements = Features.get().enableAnnouncements;
  }

  triggerNextTrick() {
    this.$emit("nextTrick");
  }

  triggerFinish() {
    this.$emit("finishRound");
  }
}
</script>

<style scoped>
@import "../assets/css/app.css";

.controls {
  grid-area: controls;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
