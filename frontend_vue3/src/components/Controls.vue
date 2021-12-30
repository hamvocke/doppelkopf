<template>
  <div class="controls">
    <button
      v-if="
        game.currentTrick.isFinished() && !game.currentRound.noMoreCardsLeft()
      "
      class="button next"
      @click="$emit('nextTrick')"
    >
      {{ $t("next-trick") }}
    </button>
    <button
      v-if="
        game.currentRound.noMoreCardsLeft() && !game.currentRound.isFinished()
      "
      class="button finish"
      @click="$emit('finishRound')"
    >
      {{ $t("finish-round") }}
    </button>

    <AnnouncementsButton v-if="enableAnnouncements" :player="game.players[0]" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, PropType } from 'vue'
import AnnouncementsButton from "@/components/AnnouncementsButton.vue";
import { Features } from "@/models/features";
import { Game } from "@/models/game";

const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true
  }
})

const emit = defineEmits(["nextTrick", "finishRound"]);

const enableAnnouncements = ref(false);
enableAnnouncements.value = Features.get().enableAnnouncements;
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
