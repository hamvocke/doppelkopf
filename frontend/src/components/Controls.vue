<template>
  <div class="controls">
    <button class="button next" v-if='game.currentTrick.isFinished() && !game.currentRound.noMoreCardsLeft()' v-on:click='triggerNextTrick()'>
      {{ $t('next-trick') }}
    </button>
    <button class="button finish" v-if='game.currentRound.noMoreCardsLeft() && !game.currentRound.isFinished()' v-on:click='triggerFinish()'>
      {{ $t('finish-round') }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    triggerNextTrick: function() {
      this.$emit("nextTrick");
    },
    triggerFinish: function() {
      this.$emit("finishRound");
    }
  }
};
</script>

<style scoped>
@import "../assets/css/app.css";

.controls {
  grid-area: controls;
  text-align: center;
}
</style>
