<template>
  <div class="controls">
    <div class="button next" v-if='currentTrick.isFinished()' v-on:click='triggerNextTrick()'>
      Next Trick >>
    </div>
    <div v-else class="button nextMove" v-on:click='triggerNextMove()'>
      Next Move >>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: ['currentTrick'],
  methods: {
    triggerNextMove: function () {
      this.$emit('nextMove')
    },
    triggerNextTrick: function () {
      this.$emit('nextTrick')
    }
  }
}
</script>

<style scoped>
@import "assets/css/colors.css";

.controls {
  grid-area: controls;
}

.button {
  padding: 12px;
  margin: 12px;
  border: 1px solid color(var(--background) lightness(80%));
  color: #000;
  border-radius: 4px;
  display: inline-block;
}

.button:hover, .button:active {
  background: rgba(255, 255, 255, 0.2)
}

</style>
