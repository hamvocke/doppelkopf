<template>
  <div class="controls">
    <div class="button next" v-if='currentTrick.isFinished()' v-on:click='triggerNextTrick()'>
      Next ➡
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: ['currentTrick'],
  methods: {
    triggerNextTrick: function () {
      this.$emit('nextTrick')
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
  padding: 12px;
  margin: 12px;
  border: 1px solid color(var(--red) shade(20%));
  color: var(--white);
  background: var(--red);
  border-radius: 4px;
  display: inline;
  font-size: 1.1em;
}

.button:hover, .button:active {
  background: color(var(--red) shade(10%));
}

</style>
