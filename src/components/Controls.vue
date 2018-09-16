<template>
  <div class="controls">
    <div class="button next" v-if='game.currentTrick.isFinished()' v-on:click='triggerNextTrick()'>
      ➡ Nächster Stich
    </div>
    <div class="button finish" v-if='game.currentRound.isFinished()' v-on:click='triggerFinish()'>
      ⏩ Auszählen
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    triggerNextTrick: function () {
      this.$emit('nextTrick')
    },
    triggerFinish: function () {
      this.$emit('finishRound')
    }
  }
}
</script>

<style scoped>
@import "../assets/css/colors.css";

.controls {
  grid-area: controls;
}

.button {
  padding: 18px;
  margin: 6px;
  color: var(--white);
  background: var(--red);
  border-radius: 6px;
  display: inline;
  font-size: 1.2em;
  border-bottom: 5px solid color(var(--red) shade(20%));
}

.button:hover, .button:active {
  border-bottom: 3px solid color(var(--red) shade(20%));
  position: relative;
  top: 2px;
}

</style>
