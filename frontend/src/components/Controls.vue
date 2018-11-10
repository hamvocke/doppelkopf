<template>
  <div class="controls">
    <div class="button next" v-if='game.currentTrick.isFinished() && !game.currentRound.noMoreCardsLeft()' v-on:click='triggerNextTrick()'>
      ➡ Next trick
    </div>
    <div class="button finish" v-if='game.currentRound.noMoreCardsLeft() && !game.currentRound.isFinished()' v-on:click='triggerFinish()'>
      ⏩ Finish round
    </div>
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
}
</style>
